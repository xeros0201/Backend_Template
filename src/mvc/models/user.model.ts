import mongoose from 'mongoose';
 
import { CreateSchema } from '../../helpers/createSchema';
import { Role } from '../../interfaces/role';
 
import { connPrimary, connTest } from '@/init/db';
import { checkPw, requiredValidation, hashPw, enumValidation, createStringField, createEnumField, createRefField } from './dbUltities';
 
 
 export interface IUser {
  _id:any
  username:  string   
   name:    string  
  email:  string  
  phone:  string  
  password: string  
  role:Role,
  address:string
 }

 
const user_role :Role[] =["ADMIN",'SUPER_ADMIN','CLIENT'] 
const{ schem ,schemTest } = CreateSchema({

  username:createStringField(8,20,true,{unique:true}),
  name:createStringField(6,20,true),
  email:createStringField(8,30,true,{unique:true}),
  password:createStringField(8,30,true,),
  role:createEnumField(user_role,user_role[2]),
 
  address:createStringField(8,30),
  phone:createStringField(9,20,true,{unique:true}),

  bills:createRefField('Bill',true),

 

 });

 schem.pre('save', hashPw)

 schemTest.pre('save', hashPw)
 
 schem.methods.isCheckPw = checkPw
 schemTest.methods.isCheckPw = checkPw
export const    User =     connPrimary.model('users', schem)
export const    UserTest =     connTest.model('users', schemTest)

