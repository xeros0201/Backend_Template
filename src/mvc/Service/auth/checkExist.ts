import { User } from "../../models";
import { IUser } from "@/mvc/models/user.model";
import { ErrorValidation } from "@/mvc/response/custom-error/types";
import { CustomError } from "../../response/custom-error/CustomError";
import { NextFunction, Request, Response } from "express-serve-static-core";
 

 

export const checkExist =    ( checkFields:string[] ) =>{
 
 return   async  (req :Request ,res:Response,next:NextFunction) =>{

   const errorsValidation: ErrorValidation[] = [];
    
 
 
    await Promise.all(checkFields.map(async (val) => {
       const checkUer = await User.findOne({ [val]:req.body[val] }) 
       
       if(checkUer){
        errorsValidation.push({[val]:`${val} trùng với người dùng:  ${checkUer.first_name} ${checkUer.last_name} !!`})
        return 
      } 
    }));
 
 
  if(errorsValidation.length!==0){

    return res.status(401).json({
      success: false,
      error: new CustomError(400,"Validation","Tạo thất bại !",null,null,errorsValidation)
    })  
  }
  next()
 }  

}