import { JwtPayload } from '@/mvc/types/express';
 
import jwt from 'jsonwebtoken';

 

export const createJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const createJwtTokenRF = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_KEY_RF, {
    expiresIn: process.env.JWT_EXPIRATION_RF,
  });
};

 

 

