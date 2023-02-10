 
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import validator from 'validator';
import { IUser } from '../models/user.model';
import { CustomError } from '../response/custom-error/CustomError';
import { ErrorValidation } from '../response/custom-error/types';


const createTextRes = (key:string) => `${key.toUpperCase} không hợp lệ !!`
export const validatorRegister = (req: Request, res: Response, next: NextFunction,valKey:any[]) => {
  let  valObject:Object  = req.body;
  const errorsValidation: ErrorValidation[] = [];
  
  _.forEach(valObject,(val,key:never)=>{
     if(valKey.indexOf(key)===-1){
      return
      } 
      let checkVal:any = !val ? "": val


      if(key==="password"&&
      validator.isLength(checkVal.trim(),{min:8,max:30})&& 
      validator.isEmpty(checkVal.trim())){
      return errorsValidation.push({ [key]: createTextRes(key) });
      }
      if(key==="email"&&
      validator.isEmail(checkVal.trim())&& 
      validator.isEmpty(checkVal.trim())){
      return errorsValidation.push({ [key]: createTextRes(key) });
      }
      if(
      validator.isEmail(checkVal.trim()) 
      ){
      return errorsValidation.push({ [key]: createTextRes(key)});
      }
    
        
    
    
  
  })
    

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Register validation error', null, null, errorsValidation);
    return res.status(500).send(customError);
  }
  return next();
};