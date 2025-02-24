import { Request, Response } from 'express';
import { orderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { TUser } from '../user/user.interface';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as TUser;
  const order = req.body;

  const result = await orderService.createOder(user, order, req.ip!);

  sendResponse(res, {
    success: true,
    message: 'order create successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getUserAllOrder = catchAsync(async (req, res) => {
  const user = req.user as TUser;
  const result = await orderService.getUserAllOrder(user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All orders retrives successfully',
    data: result,
  });
});
const getAdminAllOrder = catchAsync(async (req, res) => {
  const result = await orderService.getadminAllOrder();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All orders retrives successfully',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Order verified successfully',
    data: order,
  });
});

export const orderController = {
  getAdminAllOrder,
  getUserAllOrder,
  createOrder,
  verifyPayment,
};
