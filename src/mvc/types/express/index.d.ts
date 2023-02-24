 

import { Role } from '@/interfaces/role';
import { IUser } from '@/mvc/models/user.model';
 
export type JwtPayload = {
  id: string;
  name: string,
 
  email: string;
  role: Role;
 
};

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
      user: IUser
    }
    export interface Response {
      customSuccess(httpStatusCode: number, message: string, data?: any): Response;
    }
  }
}
