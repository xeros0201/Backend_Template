import mongoose from 'mongoose';
 
 
import { CreateSchema } from '../../helpers/createSchema';
 

 

const schema = CreateSchema({
  name:{ type:String },
  code:{type:String},
        
 
 });

 

module.exports = mongoose.model('departments', schema);
