import mongoose from 'mongoose';
import { ISchemaType } from '@/interfaces/interface';
import { CreateSchema } from '../../helpers/createSchema';
import { Role } from '../../interfaces/role';
import { IDepartment } from './department.model';
 
 
 export interface IUser {
  _id:any
  first_name:  string   
  last_name:    string  
  email:  string  
  phone:  string  
  password: string  
  nation: string  
  district_id: string  
  ward_id: string  
  city_id: string  
  address: string  
  profile_code: string  
  status:"online"|"offline"
  department: IDepartment | string | any,
  role:Role,
  avatar:string

  card_owner:string
  card_number:string
  bank_name:string
  bank_branch:string
  salary:Number
  workday:number

  office_branch: string
  sign_image:string,
  seal_image:string,
 }

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const user_role :Role[] =["ADMIN",'HEAD_OFFICE','STAFF','SUPER_ADMIN'] 
const schema  = CreateSchema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String ,lowercase: true },
  phone: { type: String  },
  password: { type: String },
  nation:{ type: String},
  district_id:{type: String},
  ward_id:{type: String},
  city_id:{type: String},
  address:{type:String},
  profile_code:{type:String},
  status:{ type:String, enum:["online","offline"], default:"offline" },
  // department:{ type:mongoose.Schema.Types.ObjectId ,ref:"departments" },
  role:{ type:String, enum:user_role },
  avatar:{ type:String    },

  card_owner:{type:String},
  card_number:{type:String},
  bank_name:{type:String},
  bank_branch:{type:String},
  salary:{type:Number},
  workday:{type:Number},
  office_branch:{type:String},
  sign_image:{ type:String    },
  seal_image:{ type:String    },

 });

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  } else {
    next();
  }
});

 
 
    export const    User =     mongoose.model('users', schema)
