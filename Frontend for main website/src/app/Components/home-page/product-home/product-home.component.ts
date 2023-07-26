import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsPagesService } from 'src/app/services/products-pages.service';
import { Router } from '@angular/router';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';
import { IProductsPages } from 'src/Model/i-products-pages';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent implements OnInit {

  AllProduct: IProductsPages[] = [];
  product: any;
  brands: string[] = [];
  selectedBrands: string[] = [];


  constructor(private productApiPages: ProductsPagesService , private router: Router, private cartService : CartService){}

  ngOnInit(): void {
    this.productApiPages.getAllProduct().subscribe(data => {
      this.AllProduct = data;
    });
  }


  successMessage:string='';
  addToCart(product: any) {
    try {
      this.cartService.addToCart(product);
      this.successMessage = `Added ${product.name} to cart successfully!`;
      alert(this.successMessage);
    } catch (error) {
      this.successMessage = `Failed to add ${product.name} to cart.`;
      alert(this.successMessage);
    }
  }
 

  
// ****************************************************

// handel scroll in card products

@ViewChild('cardContainer') cardContainer!: ElementRef;


handleCardClick(event: MouseEvent, product: any, isLeftClick: boolean = true) {
  // implement the order on click card 
  console.log('Clicked on card:', product);

  const cardElement = (event.target as HTMLElement).closest('.card');
  if (!cardElement) return; // to confirm the element is exist

  const containerElement = this.cardContainer.nativeElement;
  const cardWidth = cardElement.clientWidth;

  const cardOffsetLeft = cardElement.getBoundingClientRect().left;
  const containerScrollLeft = containerElement.scrollLeft;
  const containerWidth = containerElement.clientWidth;

  const scrollAmount = containerWidth / 2;

  if (isLeftClick) {
    const scrollLeft = containerScrollLeft + cardOffsetLeft - scrollAmount;

    containerElement.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  } else {
    const scrollRight = containerScrollLeft + cardOffsetLeft + cardWidth - scrollAmount;

    containerElement.scrollTo({
      left: scrollRight,
      behavior: 'smooth',
    });
  }
}

handleCardLeftClick(event: MouseEvent, product: any) {
  this.handleCardClick(event, product);
}

handleCardRightClick(event: MouseEvent, product: any) {
  event.preventDefault();
  this.handleCardClick(event, product, false);
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









