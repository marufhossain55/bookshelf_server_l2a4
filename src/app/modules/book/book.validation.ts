import { z } from 'zod';

export const BookSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    image: z.string().optional(),
    price: z
      .number()
      .positive('Price must be a positive number')
      .min(1, 'Price must be at least 1'),
    category: z.enum(['Fiction', 'Mystery', 'Fantasy', 'History', 'Horror']),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long'),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .nonnegative('Quantity cannot be negative'),
  }),
});
