 
import express from 'express';
import { userController } from '../../controllers';
 
import { Routes } from '../routesStrings';
import { checkJwt } from '../../middlewares/auth/checkJwt';
import { checkRole } from '../../../mvc/middlewares/auth/checkRole';

const router = express.Router();

router.get(Routes.profile, [checkJwt("token"),checkRole([],true)], userController.UserProfile);
router.post(Routes.update, [checkJwt("token")], userController.UserUpdate);
router.post(Routes.update_password, [checkJwt("token")], userController.UserUpdatePassowrd);
router.post(Routes.admin_update, [checkJwt("token"),checkRole(["SUPER_ADMIN"],false)], userController.AdminUpdate);
export default router;
