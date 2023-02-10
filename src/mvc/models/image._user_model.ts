import mongoose from 'mongoose';
 
 
import { CreateSchema } from '../../helpers/createSchema';
 

 

const schema = CreateSchema({
  name:{ type:String },
  url:{type:String},
  owner:{ type:mongoose.Schema.Types.ObjectId , ref:"users"}
 });

 

module.exports = mongoose.model('mages_ava', schema);
