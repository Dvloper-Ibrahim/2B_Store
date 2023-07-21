import { IProduct } from './i-product';

export interface ISubCategory {
  id: number;
  nameEN: string;
  nameAR: string;
  categoryId: number;
  subCategories: ISubCategory[];
  products: IProduct[];
}
