import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AdminController } from './admin.controller';

const adminRouter = Router();

adminRouter.get('/users', auth('admin'), AdminController.allUser);
adminRouter.patch(
  '/users/:userId/block',
  auth('admin'),
  AdminController.blockUser
);
export default adminRouter;
