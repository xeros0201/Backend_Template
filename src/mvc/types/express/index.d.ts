 

import { Role } from '@/interfaces/role';
 
export type JwtPayload = {
  id: number;
  first_name: string,
  last_name:string,
  email: string;
  role: Role;
 
};

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
 
    }
    export interface Response {
      customSuccess(httpStatusCode: number, message: string, data?: any): Response;
    }
  }
}
