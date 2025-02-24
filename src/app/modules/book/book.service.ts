// import QueryBuilder from '../../builder/querybuilders';
// import { Book } from './book.interface';
// import { BookModel } from './book.model';

// const createBookIntoDB = async (book: Book) => {
//   const result = await BookModel.create(book);
//   return result;
// };

// const getBooksFromDB = async (query: Record<string, unknown>) => {
//   const searchableFields = ['title', 'author', 'category'];

//   const books = new QueryBuilder(BookModel.find(), query)
//     .search(searchableFields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await books.modelQuery;
//   const meta = await books.countTotal();

//   return { result, meta };
// };

// const getSingleBookFromDB = async (_id: string) => {
//   const result = await BookModel.findById(_id);
//   return result;
// };

// const updateBookInDB = async (_id: string, book: Book) => {
//   const result = await BookModel.findByIdAndUpdate(_id, book, { new: true });
//   return result;
// };

// const deleteBookFromDB = async (_id: string) => {
//   const result = await BookModel.findByIdAndDelete(_id);
//   return result;
// };

// export const BookService = {
//   createBookIntoDB,
//   getBooksFromDB,
//   getSingleBookFromDB,
//   updateBookInDB,
//   deleteBookFromDB,
// };

import QueryBuilder from '../../builder/querybuilders';
import { Book } from './book.interface'; // Updated interface import
import { BookModel } from './book.model'; // Updated model import

const createBookIntoDB = async (book: Book) => {
  const result = await BookModel.create(book);
  return result;
};

const getBooksIntoDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'author', 'category']; // Updated searchable fields
  const books = new QueryBuilder(BookModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await books.modelQuery;
  const meta = await books.countTotal();

  return { result, meta };
};

const getSingleBookIntoDB = async (_id: string) => {
  const result = await BookModel.findById(_id);
  return result;
};

const updateBookIntoDB = async (_id: string, book: Partial<Book>) => {
  const result = await BookModel.findByIdAndUpdate(_id, book, { new: true });
  return result;
};

const deleteBookIntoDB = async (_id: string) => {
  const result = await BookModel.findByIdAndDelete(_id);
  return result;
};

export const BookService = {
  createBookIntoDB,
  getBooksIntoDB,
  getSingleBookIntoDB,
  updateBookIntoDB,
  deleteBookIntoDB,
};
