export type Book = {
  title: string;
  author: string;
  image?: string;
  price: number;
  category: 'Fiction' | 'Mystery' | 'Fantasy' | 'History' | 'Horror';
  description: string;
  quantity: number;
  inStock?: boolean;
};
