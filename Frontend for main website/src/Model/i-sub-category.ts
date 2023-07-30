import { IProduct } from './i-product';

export interface ISubCategory {
  id: number;
  nameEN: string;
  nameAR: string;
  subcategoryId: number;
  categoryId: number;
  subCategories: ISubCategory[];
  products: IProduct[];
}
