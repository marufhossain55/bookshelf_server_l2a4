import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const allUser = catchAsync(async (req, res) => {
  const result = await AdminService.getAllUser();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All user retrieve successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await AdminService.blockUser(userId);
  sendResponse(res, {
    success: true,
    message: 'user blocked successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AdminController = {
  blockUser,
  allUser,
};
