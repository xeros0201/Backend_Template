import { upload_avatars, upload_buffer, upload_seals, upload_signs } from '../../../helpers/createUpload';
import express from 'express';
import { ROLES } from '../../../interfaces/role';
import { authController } from '../../controllers';
import { checkRole } from '../../middlewares/auth/checkRole';
import { validatorRegister } from '../../validator/register_val';
import { Routes } from '../routesStrings';
import { checkJwtRF } from '../../middlewares/auth/checkJwt';
const router = express.Router();

router.post(Routes.login, authController.UserLogin);
router.post(Routes.register,[validatorRegister,
 
  upload_buffer.fields([
    {name:"sign_image", maxCount:1},
    {name:"seal_image", maxCount:1}
  ]),
 
  // ,checkRole([ROLES.SUPER_ADMIN])
], authController.UserRegister);

router.get(Routes.refresh, 
  checkJwtRF 
  // ,checkRole(["ADMIN","SUPER_ADMIN"])
 );

export default router;
