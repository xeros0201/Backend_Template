import { createJwtToken, createJwtTokenRF } from '../../../helpers/createJwtToken';
import { CustomError } from '../../../mvc/response/custom-error/CustomError';
import { JwtPayload } from '../../../mvc/types/express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../../mvc/models/user.model';
 

 
 

export const checkJwt =   (tokenKey:string) => {




  return async (req: Request, res: Response, next: NextFunction) =>{


    const authHeader = req.get(tokenKey);
   
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
      const checkUser = await User.findById(jwtPayload.id)

      if(!checkUser){ 
        const customError = new CustomError(401, 'Validation', 'JWT error', null, null);
        return res.status(401).json(customError);
       }
       const { password , ...info} =  checkUser._doc 
          req.user = info
          next()
    } catch (err) {
      const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
      return res.status(401).json(customError);
    }
  }

 
};


export const checkJwtRF = (refreshTokenKey:string) => {

  return (req: Request, res: Response, next: NextFunction) =>{

    const authHeader = req.get(refreshTokenKey);
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
     
   
    
      return res.status(200).json({success:true,
       accessToken: newAccessToken,
       refreshToken:newRefreshToken
  
      })
    } catch (err) {
      const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
      return next(customError);
    }
  }
};



export const checkJwtMedia =   (tokenKey:string) => {




  return async (req: Request, res: Response, next: NextFunction) =>{


    const authHeader:any = req.query[tokenKey];
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
      const checkUser = await User.findById(jwtPayload.id)

      if(!checkUser){ 
        const customError = new CustomError(401, 'Validation', 'JWT error', null, null);
        return res.status(401).json(customError);
       }
       const { password , ...info} =  checkUser._doc 
          req.user = info
          next()
    } catch (err) {
      const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
      return res.status(401).json(customError);
    }
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



 