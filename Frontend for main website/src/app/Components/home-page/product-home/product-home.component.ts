import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProducts } from 'src/Model/i-products';
import { ProductApiService } from 'src/app/services/product-api.service';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';


@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent implements OnInit {

  AllProduct: IProducts[] = [];
  product: any;

  constructor(private productApi: ProductApiService){}
  ngOnInit(): void {
    this.productApi.getAllProduct().subscribe(data=>{this.AllProduct=data;});
  }



  addToCart(product: any) {
    console.log('Added to cart:', product);
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
}







