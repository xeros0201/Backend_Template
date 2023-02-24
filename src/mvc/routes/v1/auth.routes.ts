import { upload   } from '../../../helpers/createUpload';
import express from 'express';
import { ROLES } from '../../../interfaces/role';
import { authController } from '../../controllers';
import { checkRole } from '../../middlewares/auth/checkRole';
 
 
import { checkJwtRF } from '../../middlewares/auth/checkJwt';
 
import { checkExist } from '../../Service/auth/checkExist';
import { validatorCommon } from '../../../mvc/validator/common_val';
import { checkReq } from '../../../mvc/validator/checkingReq';
import { authString } from '../routesStrings/authString';
import { User } from '@/mvc/models/user.model';
 
 
const router = express.Router();
let userValidation = [
  "email",
 "name",
 "phone",
 "password"
]
router.post(authString.login, authController.UserLogin);
router.post(authString.register, [validatorCommon(userValidation) ,checkExist(["email","phone","name","password"],User),
  
  // ,checkRole([ROLES.SUPER_ADMIN])
], authController.UserRegister);
router.post(authString.logout, 
  checkJwtRF("refreshToken"),
  authController.UserLogout
  // ,checkRole(["ADMIN","SUPER_ADMIN"])
 );

router.get(authString.refresh, 
  checkJwtRF("refreshToken")
  // ,checkRole(["ADMIN","SUPER_ADMIN"])
 );

export default router;
