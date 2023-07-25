import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsPagesService } from 'src/app/services/products-pages.service';
import { Router } from '@angular/router';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';
import { IProductsPages } from 'src/Model/i-products-pages';

@Component({
  selector: 'app-card-in-details-page',
  templateUrl: './card-in-details-page.component.html',
  styleUrls: ['./card-in-details-page.component.css']
})
export class CardInDetailsPageComponent  implements OnInit  {


AllProduct: IProductsPages[] = [];
// product: any;
brands: string[] = [];
selectedBrands: string[] = [];
@Input() product: IProductsPages | undefined;


constructor(private productApiPages: ProductsPagesService , private router: Router){}

ngOnInit(): void {
  this.productApiPages.getAllProduct().subscribe(data => {
    this.AllProduct = data;
  });
}


addToCart(product: any) {
  console.log('Added to cart:', product);
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


toggleBrandMenu() {
this.showBrandMenu = !this.showBrandMenu;
}

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
