import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.interface';
const orderRoutes = express.Router();

orderRoutes.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.createOrder
);
orderRoutes.get(
  '/userAllOrders',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.getUserAllOrder
);
orderRoutes.get(
  '/adminAllOrders',
  auth(USER_ROLE.admin),
  orderController.getAdminAllOrder
);

orderRoutes.patch('/verify', auth('admin'), orderController.verifyPayment);

export default orderRoutes;
