import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleGenericError = (err: any, res: Response) => {
  res.status(500).json({
    success: false,
    message: err.message,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    error: err,
    stack: err.stack,
  });
};
