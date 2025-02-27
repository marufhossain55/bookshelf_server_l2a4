import express from 'express';
import { bookController } from './book.controller';
import { USER_ROLE } from '../auth/auth.interface';
import auth from '../../middlewares/auth';

const bookRoutes = express.Router();

// Create a new book (Admin only)
bookRoutes.post('/', auth(USER_ROLE.admin), bookController.createBook);

// Get a single book by ID
bookRoutes.get('/:bookId', bookController.getSingleBook);

// Update a book by ID (Admin only)
bookRoutes.put('/:bookId', auth(USER_ROLE.admin), bookController.updateBook);

// Delete a book by ID (Admin only)
bookRoutes.delete('/:bookId', auth(USER_ROLE.admin), bookController.deleteBook);

// Get all books
bookRoutes.get('/', bookController.getAllBooks);

export default bookRoutes;
