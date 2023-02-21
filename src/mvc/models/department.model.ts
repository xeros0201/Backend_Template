import mongoose from 'mongoose';
 
 
import { CreateSchema } from '../../helpers/createSchema';
 

export interface IDepartment {
  _id:any |string
  name: string ,
  code: string ,
 }

const schema = CreateSchema({
  name: String ,
  code: String ,
        
 
 });

 

module.exports = mongoose.model('departments', schema);
