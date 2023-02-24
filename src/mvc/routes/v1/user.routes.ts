 
import express from 'express';
import { userController } from '../../controllers';
 
import { userString } from '../routesStrings/userString';
import { checkJwt } from '../../middlewares/auth/checkJwt';
import { checkRole } from '../../../mvc/middlewares/auth/checkRole';
import { tokenString } from '../routesStrings/authString';

const router = express.Router();

router.get(userString.profile, [checkJwt(tokenString),checkRole([],true)], userController.UserProfile);
router.post(userString.update, [checkJwt(tokenString)], userController.UserUpdate);
router.post(userString.update_password, [checkJwt(tokenString)], userController.UserUpdatePassowrd);
router.post(userString.admin_update, [checkJwt(tokenString),checkRole(["SUPER_ADMIN"],false)], userController.AdminUpdate);
export default router;
