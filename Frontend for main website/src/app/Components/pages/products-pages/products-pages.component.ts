
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IProductsPages } from 'src/Model/i-products-pages';
import { ProductsPagesService } from 'src/app/services/products-pages.service';

interface ComputerComponentInputs {
  category: string;
  subCategory: string;
  subSubCategory: string;
}

@Component({
  selector: 'app-products-pages',
  templateUrl: './products-pages.component.html',
  styleUrls: ['./products-pages.component.css']
})

export class ProductsPagesComponent implements OnInit, OnChanges {
  
  AllProduct: IProductsPages[] = [];

  brands: string[] = [];
  selectedBrands: string[] = [];

  @Input() computerComponentInputs!: ComputerComponentInputs;


  constructor(private productApiPages: ProductsPagesService , private router: Router) {}

  ngOnInit(): void {
    this.productApiPages.getAllProduct().subscribe(data => {
      this.AllProduct = data;
      this.updateProductsList();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['computerComponentInputs']) {
      this.updateProductsList();
    }
  }

  updateProductsList() {
    this.productApiPages.getAllProduct().subscribe(data => {
      this.AllProduct = data.filter(prod => {
        const matchCategory =
          !this.computerComponentInputs?.category ||
          prod.categoryName.toLocaleLowerCase() === this.computerComponentInputs.category.toLocaleLowerCase();
        const matchSubCategory =
          !this.computerComponentInputs?.subCategory ||
          prod.subCategoryName?.toLocaleLowerCase() === this.computerComponentInputs.subCategory.toLocaleLowerCase();
        const matchSubSubCategory =
          !this.computerComponentInputs?.subSubCategory ||
          prod.subSubCategoryName?.toLocaleLowerCase() === this.computerComponentInputs.subSubCategory.toLocaleLowerCase();

        return matchCategory && matchSubCategory && matchSubSubCategory;
      });
    });
  }

  @Input() set catFilter(cat: string) {
    this.productApiPages.getAllProduct().subscribe({
      next: data => {
        this.AllProduct = data.filter(prod => prod.categoryName.toLocaleLowerCase() === cat.toLocaleLowerCase());
      },
      error: err => console.log(err)
    });
  }

  @Input() set subCatFilter(subcat: string) {
    this.productApiPages.getAllProduct().subscribe({
      next: data => {
        this.AllProduct = data.filter(prod => prod.subCategoryName?.toLocaleLowerCase() === subcat.toLocaleLowerCase());
      },
      error: err => console.log(err)
    });
  }

  @Input() set subSubCatFilter(subSubcat: string) {
    this.productApiPages.getAllProduct().subscribe({
      next: data => {
        this.AllProduct = data.filter(prod => prod.subSubCategoryName?.toLocaleLowerCase() === subSubcat.toLocaleLowerCase());
      },
      error: err => console.log(err)
    });
  }

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }

  toggleBrandMenu() {
    this.showBrandMenu = !this.showBrandMenu;
  }

  // Checkbox for filter By Brand 
  onBrandCheckboxChange() {
    this.productApiPages.getAllProduct().subscribe(data => {
      this.AllProduct = data.filter(prod => {
        if (this.selectedBrands.length === 0) {
          return true;
        }
        return this.selectedBrands.includes(prod.brand?.trim() || '');
      });
    });
  }

  // Other functions related to brand filters and UI interactions...

  showBrandMenu: boolean = false;


  // Rating 

  getColoredStars(rating: number): number[] {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    return Array(filledStars).fill(1).concat(Array(emptyStars).fill(0));
  }

  // product details

  prodDetails(prodId:number){
    this.router.navigate(['/product',prodId]);
 }
  
  
}
