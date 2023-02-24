import mongoose, { SchemaType } from "mongoose";

const bcrypt = require('bcryptjs');
const saltRounds = 10;

 

export function hashPw (next:any) {
   try {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
   } catch (error) {
    next(error);
   }
 
}



export async function checkPw  (password) {
  try {
    return await bcrypt.compare(password,this.password)
   
  } catch (error) {
    return error
  }

}


export function enumValidation (values) {
 return {
  values:values,
  message: "Not supported type !!"
 }

}


export function requiredValidation (){
   return [true,"This field is required !"]
}

export function uniqueValidation (){
  return [true,"This field must be unique !"]
}

 
type minT = number|null |undefined
type maxT = number|null |undefined
type requiredT = boolean| null | undefined |any
type uniqueT = boolean| null | undefined |any
type modelT = 'Bill'|'' 
export function createStringField (min?:minT,max?:maxT,required?:requiredT,option?:{unique:uniqueT,_default?:any}) {


 
    let field:any = {}

    field.type = String
    min?  field.minlength = [min,`Min is ${min}!`]: "";
    max? field.maxlength = [max,`Min is ${max}!`] :"" ;
    required ? field.required = requiredValidation() :"";
    option?.unique ? field.unique = uniqueValidation() :"";
    option?._default ? field._default = option._default : ""

  return field
} 



export function createArrayStringField (min?:minT,max?:maxT,required?:requiredT,option?:{unique:uniqueT,_default?:any}) {


 
  let field:any = {}

  field.type = [String]
  min?  field.minlength = [min,`Min is ${min}!`]: "";
  max? field.maxlength = [max,`Min is ${max}!`] :"" ;
  required ? field.required = requiredValidation() :"";
  option.unique ? field.unique = uniqueValidation() :"";
  option._default ? field._default = option._default : ""

return field
} 




export function createEnumField ( values?,_default?:any) {

 
    let field:any = {}

    field.type = String
 
     field.required = requiredValidation()  
    field.enum =  enumValidation(values)
    _default ? field._default = _default : ""

  return field
} 


export function createRefField (ref:modelT,isArray?:boolean) {
  if(isArray){
    return [{
      type:mongoose.Schema.Types.ObjectId,
      ref:ref
    }]
  }

  return  {
          type:mongoose.Schema.Types.ObjectId,
          ref:ref
    }
}