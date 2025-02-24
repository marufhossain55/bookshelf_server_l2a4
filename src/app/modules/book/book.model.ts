import { model, Schema } from 'mongoose';
import { Book } from './book.interface';

const bookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    image: {
      type: String,
      optional: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be at least 1'],
      max: [100000, 'Price cannot exceed 100,000'],
    },
    category: {
      type: String,
      enum: {
        values: ['Fiction', 'Mystery', 'Fantasy', 'History', 'Horror'],
        message:
          'Category must be one of Fiction, Mystery, Fantasy, History, or Horror',
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be less than 0'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export const BookModel = model<Book>('Book', bookSchema);
