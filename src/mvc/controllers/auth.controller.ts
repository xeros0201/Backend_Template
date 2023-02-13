import {   createJwtToken, createJwtTokenRF } from '../../helpers/createJwtToken';
import { NextFunction, Request, Response } from 'express';
 
import { User } from '../models';
 
import { JwtPayload } from '../types/express';
import { LOGIN_FAILED } from './message';
import { IUser } from '../models/user.model';
 
import { checkExist } from '../Service/auth/RegisterService';
import { transStrings } from '../../constString/Register';
import { upload_seals, upload_signs } from '@/helpers/createUpload';
import   fs   from 'fs';
 
const bcrypt = require('bcryptjs');
 
const UserLogin = (req: Request | any, res: Response,next:NextFunction) => {
  return User.findOne({
    profile_code: req.body.profile_code,
  }).then(function (user: any, err: any) {
    if (err) throw err;

    if (!user) {
      res.status(403).json({
        success: false,
        message: LOGIN_FAILED,
      });
    } else if (user) {
 
      bcrypt.compare(req.body.password, user.password, function (err, compRes) {
        if (!compRes) {
          res.status(403).json({
            success: false,
            message: 'Ops! wrong Password!',
          });
        } else {
          const payload : JwtPayload = {
            id: user._id,
            role:user.role ,
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name
            
          };
          const accessToken = createJwtToken(payload);
          const refreshToken = createJwtTokenRF(payload);
      
          User.findById(user._id, function (err, result) {

                const { password,...user} = result._doc
            res.status(200).send({
              success: true,
              accessToken,
              refreshToken,
              user: {
                  ...user,
                   
                
              },
            });;
          });
        }
      });
    }
  });
};
const UserRegister = async (req: Request | any, res: Response) => {



  const {error,success} = await checkExist(req.body)
 
  
         
    
        
  if(!success){
    return  res.status(400).send(error) 
  }
    const user  = new User({
    ...req.body,
    password:"1",
    seal_image:{
      data: req.files.seal_image[0].buffer,
      contentType: req.files.seal_image[0].mimetype
    },
    sign_image:{
      data: req.files.sign_image[0].buffer,
      contentType: req.files.sign_image[0].mimetype
    } 
  });

 
  return success
    ? user
        .save()
        .then(() => {
          const payload : JwtPayload = {
            id: user._id,
            role:user.role ,
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name
            
          };

          const accessToken = createJwtToken(payload);
          const refreshToken = createJwtTokenRF(payload);
    
          res.status(200).send({
            success: true,
            message: req.t(transStrings.registeredsuccessfully, {
              first_name:user.first_name,
              last_name:user.last_name
            }),
            user: user,
            accessToken,
            refreshToken,
          
          })
         
        })
        .catch(err => {
          console.log(err);
          res.status(400).send({
            success: false,
            message: req.t(transStrings.useralreadyexists),
            error: err,
          });
        })
    :       res.status(400).send(error) ;
};





export { UserLogin, UserRegister };
