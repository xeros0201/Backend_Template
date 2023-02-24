import {   createJwtToken, createJwtTokenRF } from '../../helpers/createJwtToken';
import { NextFunction, Request, Response } from 'express';
 
 
 
import { JwtPayload } from '../types/express';
import { LOGIN_FAILED } from './message';
import { IUser, User } from '../models/user.model';
 
import { checkExist } from '../Service/auth/checkExist';
import { transStrings } from '../../constString/Register';
 
import   fs   from 'fs';
import _ from 'lodash';
import { dirname } from 'path';
import createHttpError from 'http-errors';
import { client } from '@/helpers/createRedisConn';
 
const bcrypt = require('bcryptjs');
 
const UserLogin = async (req: Request | any, res: Response,next:NextFunction) => {



   


  const userLogin  =  await User.findOne({
    email: req.body.email,
  })
  
   if(!userLogin) return  next( new createHttpError.BadRequest('User not found !')) ;
bcrypt.compare(req.body.password, userLogin.password, async function (err, compRes) {
              if (!compRes) {
                next( new createHttpError.Unauthorized('Username or password incorrect !'));
              } else {
        
                const accessToken = await createJwtToken(userLogin);
                const refreshToken = await createJwtTokenRF(userLogin);
                
                const { password,...user} = userLogin._doc
              return  res.status(200).send({
                  success: true,
                  accessToken,
                  refreshToken,
                  user: {
                      ...user,
  
                  },
                });;
              }
            });
  


 
};
const   UserRegister = async (req: Request | any, res: Response) => {
  try {
    const user  =  await new User({
      ...req.body,
   
   
    });
    await user.save()
    const accessToken = await createJwtToken(user._doc);
    console.log({accessToken})
    const refreshToken = await createJwtTokenRF(user._doc);
 
    console.log({refreshToken})

   return res.status(200).send({
      success: true,
      message: req.t(transStrings.registeredsuccessfully, {
      name:user.name
      }),
      user: user,
      accessToken,
      refreshToken,
    
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: req.t(transStrings.useralreadyexists),
      error: error,
    });
  }
 
};

const UserLogout = async (req: Request | any, res: Response,next:NextFunction) => {



 

  const userLogin  =  await User.findOne({
    email: req.user.email,
  })
  
   if(!userLogin) return  next( new createHttpError.BadRequest('User not found !')) ;

  try{
      client.del(userLogin._id.toString())
      return res.json({
        message:"Logout !"
      })
  }catch(e){
    console.log(e)
    return  next( new createHttpError.BadRequest('..!')) ;
  }


 
};



export { UserLogin, UserRegister,UserLogout };
