import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name must be provided' }).min(3).max(50),
    email: z.string({ required_error: 'Email must be provided' }).email(),
    password: z
      .string({ required_error: 'Password must be provided' })
      .max(20, { message: 'Password can not be more than 20 character' }),
  }),
});
const userProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});
export const userValidation = {
  userValidationSchema,
  userProfileValidationSchema,
};
