import { Injectable } from '@angular/core';
import { IProductsPages } from 'src/Model/i-products-pages';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: IProductsPages[] = [];

  constructor() { 
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  addToCart(item: IProductsPages) {
    this.cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): IProductsPages[] {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }
}
