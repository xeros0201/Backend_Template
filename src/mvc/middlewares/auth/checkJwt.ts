import { createJwtToken, createJwtTokenRF } from '../../../helpers/createJwtToken';
import { CustomError } from '../../../mvc/response/custom-error/CustomError';
import { JwtPayload } from '../../../mvc/types/express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

 
 

export const checkJwt =   (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('token');
  if (!authHeader) {
    const customError = new CustomError(400, 'General', 'Authorization header not provided');
    return res.status(400).json(customError);
  }

  const token = authHeader.split(' ')[1];
  let jwtPayload: { [key: string]: any };
  try {
    jwtPayload =   jwt.verify(token, process.env.JWT_KEY as string) as { [key: string]: any };
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
     return next()
  } catch (err) {
    const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
    return res.status(401).json(customError);
  }

  // try {
  //   // Refresh and send a new token on every request
  //   const newToken = createJwtToken(jwtPayload as JwtPayload);
  //   res.setHeader('accessToken', `Bearer ${newToken}`);
  //   return next();
  // } catch (err) {
  //   const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
  //   return res.status(400).json(customError);
  // }
};


export const checkJwtRF = (req: Request, res: Response, next: NextFunction) => {

  console.log(req.cookies)
  console.log(req.headers.cookie)
  const authHeader = req.get('refreshToken');
  if (!authHeader) {
    const customError = new CustomError(400, 'General', 'Authorization header not provided');
    return res.status(400).json(customError);
  }

  const token = authHeader.split(' ')[1];
  let jwtPayload: { [key: string]: any };
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_KEY_RF as string) as { [key: string]: any };
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
  } catch (err) {
    const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
    return res.status(401).json(customError);
  }

  try {
     
    const newRefreshToken = createJwtTokenRF(jwtPayload as JwtPayload);
    const newAccessToken = createJwtToken(jwtPayload as JwtPayload);
    res.setHeader('accessToken', `Bearer ${newAccessToken}`);
    res.setHeader('refreshToken', `Bearer ${newRefreshToken}`);
    res.clearCookie("refreshToken")
 
    res.cookie('refreshToken',newRefreshToken,{
      expires: new Date(Date.now() + 90000000),
      sameSite:'none',
      secure:true
    })
    return res.status(200).json({success:true,
      newAccessToken:req.headers.cookie,

    })
  } catch (err) {
    const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
    return next(customError);
  }
};

