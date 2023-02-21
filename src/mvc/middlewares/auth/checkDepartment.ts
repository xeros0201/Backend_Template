 
import { CustomError } from '../../../mvc/response/custom-error/CustomError';
 
import { Request, Response, NextFunction } from 'express';
 
 
 

 




export const checkDepartment =   () => {




  return   (req: Request, res: Response, next: NextFunction) =>{

     
               const check:any =    req.user.department   === req.get("department")
                if( !req.user.department ||  !req.query.department ){
                  const customError = new CustomError(400, 'General', 'Không hợp lệ !');
                  return next(customError)
                }
               if(check){

                return next()
               }
               const customError = new CustomError(400, 'General', 'Không cùng bộ phận !');

       
              return next(customError)
          
  }
 
};


export const checkDepartmentMediaAndFiles =   () => {




  return   (req: Request, res: Response, next: NextFunction) =>{

     
               const check:any =    req.user.department   === req.params.department
                if( !req.user.department ||  !req.query.department ){
                  const customError = new CustomError(400, 'General', 'Không hợp lệ !');
                  return next(customError)
                }
               if(check){

                return next()
               }
               const customError = new CustomError(400, 'General', 'Không cùng bộ phận !');

       
              return next(customError)
          
  }
 
};