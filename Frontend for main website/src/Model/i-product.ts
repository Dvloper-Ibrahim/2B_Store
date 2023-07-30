import { ISubCategory } from './i-sub-category';

export interface IProduct {
  id: number;
  productNameEN: string;
  productNameAR: string;
  price: number;
  stock: number;
  image: string;
  brandEN: string;
  brandAR: string;
  descriptionEN: string;
  descriptionAR: string;
  subcategoryId: number;
  subCategory: ISubCategory;
}
