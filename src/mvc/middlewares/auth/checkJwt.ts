import { createJwtToken, createJwtTokenRF } from '../../../helpers/createJwtToken';
import { CustomError } from '../../../mvc/response/custom-error/CustomError';
import { JwtPayload } from '../../../mvc/types/express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../../mvc/models/user.model';
import createHttpError from 'http-errors';
import { client } from '@/helpers/createRedisConn';
 

 
 

export const checkJwt =   (tokenKey:string) => {




  return async (req: Request, res: Response, next: NextFunction) =>{


    const authHeader:any = req.headers[tokenKey];
   
    if (!authHeader) {
      const customError = new CustomError(400, 'General', 'Authorization header not provided');
      return next(customError)
    }
  
    const token = authHeader.split(' ')[1];

      jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
          if( err){
            if(err.name ==="JsonWebTokenError"){

              return next(createHttpError.Unauthorized())
            }
            return next(createHttpError.Unauthorized(err.message))
          }
          req.jwtPayload = payload as JwtPayload;
          next()
      })

 
  }

 
};


export const checkJwtRF = (refreshTokenKey:string) => {


  return async (req: Request, res: Response, next: NextFunction) =>{


    const authHeader:any = req.headers[refreshTokenKey];
   
    if (!authHeader) {
      const customError = new CustomError(400, 'General', 'Authorization header not provided');
      return next(customError)
    }
  
    const token = authHeader.split(' ')[1];

      jwt.verify(token,process.env.JWT_KEY_RF,(err,payload)=>{
          if( err){
            if(err.name ==="JsonWebTokenError"){

              return next(createHttpError.Unauthorized())
            }

            return next(createHttpError.Unauthorized(err.message))
          }

          client.get(payload.id).then((value)=>{
            if(value===authHeader){
              req.jwtPayload = payload as JwtPayload;
             return next()

            }
            return next(createHttpError.InternalServerError())
           
          next()
          }).catch((e)=>{
              return next(createHttpError.InternalServerError())
          })
          
      })

 
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



 