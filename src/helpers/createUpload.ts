import { CustomError } from "../mvc/response/custom-error/CustomError";
import multer from "multer";
import { JwtPayload } from "@/mvc/types/express";
import { relative } from "path";
import { crossOriginEmbedderPolicy } from "helmet";




const storage_avatars = multer.diskStorage({
  destination:(req,file,cb)=>{

      
    
      return cb(null,'uploads/'+file.fieldname)
   
     
     
  },
  filename:(req, file, callback)=> {
    console.log({file})
    if(file.mimetype==="image/jpeg"
    ||file.mimetype==="image/jpg"
    ||file.mimetype==="image/png"
    ) {
      
      const { id }: JwtPayload = req.jwtPayload

     
      const uniqueSuffix =    file.fieldname+"-"+id+"."+file.mimetype.split('image/')[1]
      callback(null,uniqueSuffix)
      return
    }
    return callback(new CustomError(500,"Validation","Chỉ chấp nhận png, jpeg và jpg !!",null,null,null),null)
  },
  
})
 
 

const storage_files = multer.diskStorage({
  destination:(req,file,cb)=>{

      
    
      return cb(null,'uploads/'+file.fieldname)
   
     
     
  },
  filename:(req, file, callback)=> {
    console.log({file})
    if(file.mimetype==="application/vnd.openxmlformatsofficedocument.wordprocessingml.document"
    ||file.mimetype==="application/msword"  
    ) {
      
      // const { id }: JwtPayload = req.jwtPayload

      const id ="123"
      const uniqueSuffix =    file.fieldname+"-"+id+"."+file.mimetype.split('image/')[1]
      callback(null,uniqueSuffix)
      return
    }
    return callback(new CustomError(500,"Validation","Chỉ chấp nhận png, jpeg và jpg !!",null,null,null),null)
  },
  
})

 


export const upload = multer({ 
  
  storage:storage_avatars, 
  limits:{
    fileSize:5048576 //50mb
  }
})
 

 

 