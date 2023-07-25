import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsPagesService } from 'src/app/services/products-pages.service';
import {  Router } from '@angular/router';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';
import { IProductsPages } from 'src/Model/i-products-pages';
import { ProductFilterService } from 'src/app/services/product-filter.service';



@Component({
  selector: 'app-product-carosel',
  templateUrl: './product-carosel.component.html',
  styleUrls: ['./product-carosel.component.css']
})
export class ProductCaroselComponent implements OnInit , OnChanges {

  @Input() AllProduct: IProductsPages[] = []; 
  product: any;
  brands: string[] = [];
  selectedBrands: string[] = [];
// ***********************************

carouselItems: IProductsPages[] = [];
carouselItemsChunks: IProductsPages[][] = [];
currentSlide = 0;

// ===================================

@Input() selectedsubCategoryId: number= 0;// Receive the selected category ID from the parent component

  constructor(private productApiPages: ProductsPagesService , private router: Router , private productFilterService :ProductFilterService ){}

  ngOnInit(): void {
    this.productApiPages.getAllProduct().subscribe(data => {
      this.AllProduct = data;
      this.chunkCarouselItems(); 
      this.setCurrentSlide(0); 
    });

    this.productFilterService.filterBySubCategoryId(this.AllProduct, this.selectedsubCategoryId);

  }

  
  
  
  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
 

  
// ****************************************************


chunkCarouselItems() {
  const chunkSize = 4;
  const startIndex = this.currentSlide * chunkSize;
  this.carouselItemsChunks = [this.AllProduct.slice(startIndex, startIndex + chunkSize)];
}




 // product carosel
 setCurrentSlide(index: number) {
  this.currentSlide = index;
  this.chunkCarouselItems();
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


// *******************************************

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
    if ('selectedsubCategoryId' in changes) {
      // Call the filter method when the selected category changes
      this.filterProductsBySubcategory();
    }
  }

  // filterProductsByCategory() {
  //   this.AllProduct = this.productFilterService.filterBySubCategoryId(this.AllProduct, this.selectedCategoryId);
  //   this.chunkCarouselItems();
  // }

  // filterProductsBySubcategory() {
  //   if(this.selectedsubCategoryId != null){
  //   const subCategoryId: number = this.selectedsubCategoryId !== null ? this.selectedsubCategoryId : 0; // Use 0 as default if selectedSubCategoryId is null
  //   this.AllProduct = this.productFilterService.filterBySubCategoryId(this.AllProduct, subCategoryId);
  //   this.chunkCarouselItems();
  //   }
  // }


  filterProductsBySubcategory() {
    const subCategoryId: number = this.selectedsubCategoryId !== null ? this.selectedsubCategoryId : 0;
    this.AllProduct = this.productFilterService.filterBySubCategoryId(this.AllProduct, subCategoryId);
    this.chunkCarouselItems();
  }

}