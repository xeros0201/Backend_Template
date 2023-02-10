import { CustomError } from "../mvc/response/custom-error/CustomError";
import multer from "multer";
import { JwtPayload } from "@/mvc/types/express";




const storage_avatars = multer.diskStorage({
  destination:(req,file,cb)=>{
          cb(null,'uploads/avatars')
  },
  filename:(req, file, callback)=> {
    console.log({file})
    if(file.mimetype==="image/jpeg"
    ||file.mimetype==="image/jpg"
    ||file.mimetype==="image/png"
    ) {

      const {first_name,last_name,id }: JwtPayload = req.jwtPayload
      const uniqueSuffix =    "avatar"+"-"+id+"."+file.mimetype.split('image/')[1]
      callback(null,uniqueSuffix)
      return
    }
    return callback(new CustomError(500,"Validation","Chỉ chấp nhận png, jpeg và jpg !!",null,null,null),null)
  },
  
})

const storage_signs = multer.diskStorage({
  destination:(req,file,cb)=>{
          cb(null,'uploads/signs')
  },
  filename:(req, file, callback)=> {
    if(file.mimetype==="image/jpeg"
    ||file.mimetype==="image/jpg"
    ||file.mimetype==="image/png"
    ) {
      const uniqueSuffix =  "sign"+"-"+req.body.last_name+"-"+file.originalname
      callback(null,uniqueSuffix)
      return
    }
    return callback(new CustomError(500,"Validation","Chỉ chấp nhận png, jpeg và jpg !!",null,null,null),null)
  },
})
const storage_seals= multer.diskStorage({
  destination:(req,file,cb)=>{
          cb(null,'uploads/seals')
  },
  filename:(req, file, callback)=> {
          if(file.mimetype==="image/jpeg"
          ||file.mimetype==="image/jpg"
          ||file.mimetype==="image/png"
          ) {
            const uniqueSuffix =  "seal"+"-"+req.body.last_name+"-"+file.originalname
            callback(null,uniqueSuffix)
            return
          }
          return callback(new CustomError(500,"Validation","Chỉ chấp nhận png, jpeg và jpg !!",null,null,null),null)
  },

})
 

const storage_buffer = multer.memoryStorage()



export const upload_avatars = multer({ 
  
  storage:storage_avatars, 
  limits:{
    fileSize:1048576 //10mb
  }
})


export const upload_signs = multer({ 
  limits:{
    fileSize:1024*parseInt(process.env.FILE_LIMIT),
  },
  storage:storage_signs
})

export const upload_buffer = multer({ 
  limits:{
    fileSize:1048576,
  },
  storage:storage_buffer
})


export const upload_seals = multer({ 
  limits:{
    fileSize:1024*parseInt(process.env.FILE_LIMIT),
  },
  storage:storage_seals
})