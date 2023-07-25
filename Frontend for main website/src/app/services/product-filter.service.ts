import { Injectable } from '@angular/core';
import { IProductsPages } from 'src/Model/i-products-pages';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  constructor() { }

  filterByCategoryId(products: IProductsPages[], categoryId: number): IProductsPages[] {
    if (categoryId !== null) {
      return products.filter(prod => prod.categoryId === categoryId);
    } else {
      return products;
    }
  }


  filterBySubCategoryId(products: IProductsPages[], subCategoryId: number): IProductsPages[] {
    if (subCategoryId !== null) {
      return products.filter(prod => prod.subCategoryId === subCategoryId);
    } else {
      return products;
    }
  }


filterBySubSubCategoryId(products: IProductsPages[], subSubCategoryId: number): IProductsPages[] {
  if (subSubCategoryId !== null) {
    return products.filter(prod => prod.subSubCategoryId === subSubCategoryId);
  } else {
    return products;
  }
}



}
