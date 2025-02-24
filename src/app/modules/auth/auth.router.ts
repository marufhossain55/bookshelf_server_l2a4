import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  AuthController.register
);
authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
);
authRouter.get(
  '/user/:id',

  AuthController.singleUser
);
authRouter.patch(
  '/user/updateProfile',
  auth('admin', 'customer'),
  validateRequest(userValidation.userProfileValidationSchema),
  AuthController.updateUser
);
authRouter.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);

authRouter.patch(
  '/change-password',
  auth('admin', 'customer'),
  AuthController.resetPassword
);
authRouter.post('/logout', AuthController.logOut);
export default authRouter;
