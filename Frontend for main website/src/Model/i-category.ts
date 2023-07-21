import { ISubCategory } from './i-sub-category';

export interface ICategory {
  id: number;
  nameEN: string;
  nameAR: string;
  type: string;
  image: string;
  descriptionEN: string;
  descriptionAR: string;
  subCategories: ISubCategory[];
}
