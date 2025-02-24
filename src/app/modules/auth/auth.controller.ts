/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  // const { _id, name, email } = result;

  sendResponse(res, {
    success: true,
    message: 'User register successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  const { refreshToken } = result;

  // set refresh token in cookies
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: {
      token: result.accessToken,
    },
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;
  console.log('id', req.user);
  const body = req.body;
  const result = await AuthService.updateUser(_id, body);
  sendResponse(res, {
    success: true,
    message: 'User update successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const singleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id, 'sonamia');
  const result = await AuthService.singleUser(id);
  console.log(result, 'from controller');
  sendResponse(res, {
    success: true,
    message: 'single user get successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const user = req.user;
  await AuthService.resetPassword(body, user as JwtPayload);
  sendResponse(res, {
    success: true,
    message: 'password change successfully',
    statusCode: StatusCodes.OK,
    data: null,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken, res);
  // console.log(result,"controler result");
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: {
      token: result,
    },
  });
});
const logOut = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  sendResponse(res, {
    success: true,
    message: 'Logout',
    statusCode: StatusCodes.OK,
    data: [],
  });
};
export const AuthController = {
  register,
  login,
  refreshToken,
  logOut,
  singleUser,
  resetPassword,
  updateUser,
};
