import { JwtPayload } from '@/mvc/types/express';
 
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { client } from './createRedisConn';
import createHttpError from 'http-errors';
dotenv.config();




export const createJwtToken =  async  (userLogin): Promise<string> => {

  return  new Promise((resolve,reject)=>{

    const payload : JwtPayload = {
      id: userLogin._id,
      role:userLogin.role ,
      email:userLogin.email,
 
       name:userLogin.name
      
    };
  const option = {
    expiresIn: process.env.JWT_EXPIRATION,
  }

    jwt.sign(payload, process.env.JWT_KEY, option,(err,token)=>{
      if(err)   reject(err)
     
        resolve(token)
    });
  })
 
};

 


export const createJwtTokenRF = async  (userLogin:any): Promise<string> => {

  return  new Promise((resolve,reject)=>{

    const payload : JwtPayload = {
      id: userLogin._id,
      role:userLogin.role ,
      email:userLogin.email,
      name:userLogin.name
      
    };
  const option = {
    expiresIn: '1y',
  }

    jwt.sign(payload, process.env.JWT_KEY_RF, option,(err,token)=>{
      if(err)   reject(err)

   
     
          client.set( payload.id.toString(), token,{
            EX:360*24*60*60
          }).then((val)=>{
           
              console.log({val})
              resolve(token)
          }).catch((err)=>{
            console.log({err})
            reject(err)
          })
     
   
      
    
    });
  })
 
};
 

 

