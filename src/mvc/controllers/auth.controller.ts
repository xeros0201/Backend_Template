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
 
const bcrypt = require('bcryptjs');
 
const UserLogin = async (req: Request | any, res: Response,next:NextFunction) => {



   


  const userLogin  =  await User.findOne({
    profile_code: req.body.profile_code,
  })
  
   if(!userLogin) return  res.status(403).json({
              success: false,
              message: 'Đăng nhập thất bại',
            });
            bcrypt.compare(req.body.password, userLogin.password, function (err, compRes) {
              if (!compRes) {
                res.status(403).json({
                  success: false,
                  message: 'Đăng nhập thất bại, sai mật khẩu hoặc tài khoản !',
                });
              } else {
                const payload : JwtPayload = {
                  id: userLogin._id,
                  role:userLogin.role ,
                  email:userLogin.email,
                  first_name:userLogin.first_name,
                  last_name:userLogin.last_name
                  
                };
                const accessToken = createJwtToken(payload);
                const refreshToken = createJwtTokenRF(payload);
                
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
const UserRegister = async (req: Request | any, res: Response) => {



  
       
      
   
          
   
    const user  = new User({
    ...req.body,
    password:"1",
    // avatar:`/static/${req.files.filename}`,
    // seal_image:`/private/${req.file.filename}`,
    // sign_image:`/private/${req.file.filename}`
  });

  
  return res.status(200).json(user)   
        // .save()
        // .then(() => {
        //   const payload : JwtPayload = {
        //     id: user._id,
        //     role:user.role ,
        //     email:user.email,
        //     first_name:user.first_name,
        //     last_name:user.last_name
            
        //   };

        //   const accessToken = createJwtToken(payload);
        //   const refreshToken = createJwtTokenRF(payload);
    
        //   res.status(200).send({
        //     success: true,
        //     message: req.t(transStrings.registeredsuccessfully, {
        //       first_name:user.first_name,
        //       last_name:user.last_name
        //     }),
        //     user: user,
        //     accessToken,
        //     refreshToken,
          
        //   })
         
        // })
        // .catch(err => {
        //   console.log(err);
        //   res.status(400).send({
        //     success: false,
        //     message: req.t(transStrings.useralreadyexists),
        //     error: err,
        //   });
        // })
 
};





export { UserLogin, UserRegister };
