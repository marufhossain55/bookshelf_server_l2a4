import { Router } from 'express';
import authRouter from '../modules/auth/auth.router';
import adminRouter from '../modules/admin/admin.route';
import bookRoutes from '../modules/book/book.route';
import orderRoutes from '../modules/order/order.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/admin',
    route: adminRouter,
  },
  {
    path: '/products',
    route: bookRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
