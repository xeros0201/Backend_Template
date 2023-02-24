 
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import validator from 'validator';
import { IUser } from '../models/user.model';
import { CustomError } from '../response/custom-error/CustomError';
import { ErrorValidation } from '../response/custom-error/types';


const createTextRes = (key:string) => `${key} không hợp lệ !!`
export const validatorCommon = (valKey:any[]) => {

  

    return  (req: Request, res: Response, next: NextFunction) =>{

      let  valObject:Object  = req.body;
 
      const errorsValidation: ErrorValidation[] = [];
      
      
      valKey.map((key)=>{


        if(!valObject[key]) return errorsValidation.push({ [key]: createTextRes(key) }) 
        if(key==="password"&&
        validator.isLength(valObject[key].trim(),{min:8,max:30})&& 
        validator.isEmpty(valObject[key].trim())){
        return errorsValidation.push({ [key]: createTextRes(key) });
        }
        if(key==="email" ){

        
           if( !validator.isEmail(valObject[key].trim())) return errorsValidation.push({ [key]: createTextRes(key) })
           if(  validator.isEmpty(valObject[key].trim())) return errorsValidation.push({ [key]: createTextRes(key) });
           return 
        }
        if(
        validator.isEmpty(valObject[key].trim()) 
        ){
        return errorsValidation.push({ [key]: createTextRes(key)});
        }

      })


    
     
      if (errorsValidation.length !== 0) {
        const customError =   new CustomError(400, 'Validation', 'Register validation error', null, null, errorsValidation);
        return next(customError);
      }
      return next();
    }
};