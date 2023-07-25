import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsPagesService } from 'src/app/services/products-pages.service';
import {  Router } from '@angular/router';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';
import { IProductsPages } from 'src/Model/i-products-pages';
import { ProductFilterService } from 'src/app/services/product-filter.service';


@Component({
  selector: 'app-side-carosel',
  templateUrl: './side-carosel.component.html',
  styleUrls: ['./side-carosel.component.css']
})
export class SideCaroselComponent implements OnInit , OnChanges {


  @Input() AllProduct: IProductsPages[] = []; 
  product: any;
  brands: string[] = [];
  selectedBrands: string[] = [];
// ***********************************

carouselItems: IProductsPages[] = [];
carouselItemsChunks: IProductsPages[][] = [];
currentSlide = 0;

// ===================================

@Input() selectedsubSubCategoryId: number= 0;// Receive the selected category ID from the parent component

  constructor(private productApiPages: ProductsPagesService , private router: Router , private productFilterService :ProductFilterService ){}

  ngOnInit(): void {
    this.productApiPages.getAllProduct().subscribe(data => {
      this.AllProduct = data;
      this.chunkCarouselItems(); 
      this.setCurrentSlide(0); 
    });

    this.productFilterService.filterBySubSubCategoryId(this.AllProduct, this.selectedsubSubCategoryId);

  }

  
  
  
  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
 

  
// ****************************************************


chunkCarouselItems() {
  const chunkSize = 2;
  const startIndex = this.currentSlide * chunkSize;
  this.carouselItemsChunks = [this.AllProduct.slice(startIndex, startIndex + chunkSize)];
}




 // product carosel
 setCurrentSlide(index: number) {
  this.currentSlide = index;
  this.chunkCarouselItems();
}
 

// *******************************************

// Other functions related to brand filters and UI interactions...

showBrandMenu: boolean = false;

// Rating 

getColoredStars(rating: number): number[] {
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;
  return Array(filledStars).fill(1).concat(Array(emptyStars).fill(0));
}

// product details

prodId=0;
  NavigateToprodDetails(product: IProductsPages) {
    this.productApiPages.getproductsById(product.id)
      .subscribe({
        next: (data: IProductsPages) => {
          this.product = data;
          console.log(this.product);

          this.prodId = product.id;

          this.router.navigate(['/product', product.id])
                    .then(() => {
                      // refresh the page after click new product 
                      window.location.reload();
                    })
        },
        error: (error: any) => {
          console.error('Failed to load product details', error);
        }
      });
  }

  // Filter products based on subCategoryId


  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedsubSubCategoryId' in changes) {
      // Call the filter method when the selected category changes
      this.filterBySubSubCategoryId();
    }
  }


  filterBySubSubCategoryId() {
    const subSubCategoryId: number = this.selectedsubSubCategoryId !== null ? this.selectedsubSubCategoryId : 0;
    this.AllProduct = this.productFilterService.filterBySubCategoryId(this.AllProduct, subSubCategoryId);
    this.chunkCarouselItems();
  }

}


