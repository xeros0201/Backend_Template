import { User } from "../../models";
import { IUser } from "@/mvc/models/user.model";
import { ErrorValidation } from "@/mvc/response/custom-error/types";
import { CustomError } from "../../../mvc/response/custom-error/CustomError";
 

 

export const checkExist = async  ( user: IUser ) =>{

  const  { email,phone,profile_code, card_number }:IUser = user
  const errorsValidation: ErrorValidation[] = [];
  const checkEmail:IUser  = await User.findOne({ email:email })
  const checkPhone:IUser = await User.findOne({ phone:phone })
  const checkProfile_code:IUser = await User.findOne({ profile_code:profile_code })
  const checkCard:IUser = await User.findOne({ card_number:card_number })
  console.log({checkEmail})
  if(checkEmail) errorsValidation.push({email:`Email trùng với người dùng:  ${checkEmail.first_name} ${checkEmail.last_name} !!`})
  if(checkPhone) errorsValidation.push({phone:`Số điện thoại trùng với người dùng:  ${checkPhone.first_name} ${checkPhone.last_name} !!`})
  if(checkProfile_code) errorsValidation.push({profile_code:`Mã ngành trùng với người dùng: ${checkProfile_code.first_name} ${checkProfile_code.last_name} !!`})
  if(checkCard) errorsValidation.push({card_number:`Mã ngành trùng với người dùng:  ${checkCard.first_name} ${checkCard.last_name} !!`})


  if(errorsValidation.length!==0){
    return {
      success: false,
      error: new CustomError(400,"Validation","Tạo thất bại !",null,null,errorsValidation)
    }
  }
  return {
    success: true,
    error: null
  }

}