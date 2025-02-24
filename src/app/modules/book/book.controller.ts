import { Request, Response } from 'express';
import { BookService } from './book.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const result = await BookService.createBookIntoDB(book);
  sendResponse(res, {
    success: true,
    message: 'Book created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const queryData = req?.query;
  const result = await BookService.getBooksIntoDB(queryData);
  sendResponse(res, {
    success: true,
    message: 'Books retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result.result,
    // meta: result.meta,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const result = await BookService.getSingleBookIntoDB(bookId);
  sendResponse(res, {
    success: true,
    message: 'Book retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const body = req.body;
  const result = await BookService.updateBookIntoDB(bookId, body);
  sendResponse(res, {
    success: true,
    message: 'Book updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const result = await BookService.deleteBookIntoDB(bookId);
  sendResponse(res, {
    success: true,
    message: 'Book deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const bookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
