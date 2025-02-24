export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: 'customer' | 'admin';
  isBlocked?: boolean;
  city?: string;
  address?: string;
  phone?: string;
  image?: string;
};
