import { upload_avatars } from '../../helpers/createUpload';
import express from 'express';
import { userController } from '../controllers';
import { auth } from '../middlewares';
import { Routes } from './routesStrings';
import { checkJwt } from '../middlewares/auth/checkJwt';

const router = express.Router();

router.get(Routes.profile, [checkJwt], userController.UserProfile);
router.post(Routes.update, [checkJwt], userController.UserUpdate);
router.post(Routes.avatar,[ 
  checkJwt,
  upload_avatars.single('avatar')
  // ,checkRole([ROLES.SUPER_ADMIN])
], userController.UserAvatar);
export default router;
