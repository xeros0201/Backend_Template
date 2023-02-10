 
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import validator from 'validator';
import { IUser } from '../models/user.model';
import { CustomError } from '../response/custom-error/CustomError';
import { ErrorValidation } from '../response/custom-error/types';


const createTextRes = (key:string) => `${key.toUpperCase()} không hợp lệ !!`
export const validatorRegister = (req: Request, res: Response, next: NextFunction) => {
  let  valObject:Object  = req.body;

  let valKey = [
    "email",
  ,"first_name"
  ,"last_name"
  ,"role"
  ,"profile_code"
  ,"department"
  ,"office_branch"
  ,"card_owner"
  ,"card_number"
  ,"bank_name"
  ,"bank_branch"
  ,"salary"
  ,"workday"
 
]
  const errorsValidation: ErrorValidation[] = [];
  
  _.forEach(valObject,(val,key:never)=>{
     if(!valKey.includes(key)){
      return
      } 
    
      let checkVal:any = !val ? "": val


      if(key==="password"&&
      !validator.isLength(checkVal.trim(),{min:8,max:30})&& 
      validator.isEmpty(checkVal.trim())){
       return errorsValidation.push({ [key]: createTextRes(key) });
      }
      if(key==="email"&&
      !validator.isEmail(checkVal.trim())&& 
      validator.isEmpty(checkVal.trim())){
        return errorsValidation.push({ [key]: createTextRes(key) });
      }
      if(validator.isEmpty(checkVal.trim()) ){
        return errorsValidation.push({ [key]: createTextRes(key)});
      }
    
        
    
    
  
  })
    // console.log({errorsValidation})

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Register validation error', null, null, errorsValidation);
    return res.status(500).send(customError);
  }
  return next();
};