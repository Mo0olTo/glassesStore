export interface IProduct {
  title: string;
  description?: string;
  images: string[];
  price: number;
  stock: number;
  sold?: number;
  category: string;
  brand?: string;
  gender?: 'male' | 'female' | 'unisex';
}