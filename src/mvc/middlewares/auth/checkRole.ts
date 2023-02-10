import { Role } from '@/interfaces/role';
import { CustomError } from '@/mvc/response/custom-error/CustomError';
import { Request, Response, NextFunction } from 'express';

 



export const checkRole = (roles: Role[], isSelfAllowed = false) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const { id, role }  = req.user;
    const { id: requestId } = req.params;

    let errorSelfAllowed: string | null = null;
    if (isSelfAllowed) {
      if (id === parseInt(requestId)) {
        return next();
      }
      errorSelfAllowed = 'Self allowed action.';
    }

    if (roles.indexOf(role) === -1) {
      const errors = [
        'Unauthorized - Insufficient user rights',
        `Current role: ${role}. Required role: ${roles.toString()}`,
      ];
      if (errorSelfAllowed) {
        errors.push(errorSelfAllowed);
      }
      const customError = new CustomError(401, 'Unauthorized', 'Unauthorized - Insufficient user rights', errors);
      return next(customError);
    }
    return next();
  };
};
