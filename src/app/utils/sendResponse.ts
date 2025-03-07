import { Response } from 'express';
type TSuccessResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T | T[] | null;
  meta?: { page: number; limit: number; total: number; totalPage: number };
};
const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
    meta: data.meta,
  });
};
export default sendResponse;
