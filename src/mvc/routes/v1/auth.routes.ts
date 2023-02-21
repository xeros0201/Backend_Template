import { upload   } from '../../../helpers/createUpload';
import express from 'express';
import { ROLES } from '../../../interfaces/role';
import { authController } from '../../controllers';
import { checkRole } from '../../middlewares/auth/checkRole';
 
import { Routes } from '../routesStrings';
import { checkJwtRF } from '../../middlewares/auth/checkJwt';
 
import { checkExist } from '../../Service/auth/checkExist';
import { validatorCommon } from '../../../mvc/validator/common_val';
import { checkReq } from '../../../mvc/validator/checkingReq';
 
const router = express.Router();
let userValidation = [
  "email",
,"first_name"
,"last_name"
,"role"
,"profile_code"
,"department"
,"office_branch"
,"card_owner"
,"card_number"
,"bank_name"
,"bank_branch"
,"salary"
,"workday"
]
router.post(Routes.login, authController.UserLogin);
router.post(Routes.register,[  upload.fields([
  {name:"avatar",maxCount:1},
  {name:"sign_image", maxCount:1},
  {name:"seal_image", maxCount:1}
]), validatorCommon(userValidation) ,checkExist(["email","phone","profile_code","card_number"]),
  
  // ,checkRole([ROLES.SUPER_ADMIN])
], authController.UserRegister);

router.get(Routes.refresh, 
  checkJwtRF("refreshToken")
  // ,checkRole(["ADMIN","SUPER_ADMIN"])
 );

export default router;
