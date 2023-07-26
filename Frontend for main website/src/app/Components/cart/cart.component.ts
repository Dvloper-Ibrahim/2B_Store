// import { Component, OnInit } from '@angular/core';
// import { IProductsPages } from 'src/Model/i-products-pages';
// import { CartService } from 'src/app/services/cart.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit{

//   cartItems: IProductsPages[] = [];
//   total: number = 0;
//   taxRate: number = 0.14; // نسبة الضريبة (14٪)
//   quantity:number =1;
//   constructor(private cartService: CartService) { }

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCartItems();
//     this.calculateTotals();
//   }

//   // getSubtotal(): number {
//   //   return this.cartItems.reduce((total, item) => total + item.price, 0);
//   // }

//   getSubtotal(): number {
//     return this.cartItems.reduce((total, item) => total + (item.price * this.quantity ), 0);
//   }

//   getTax(): number {
//     return this.getSubtotal() * 0.15; // Assuming 15% tax rate
//   }

//   getTotal(): number {
//     return this.getSubtotal() + this.getTax();
//   }

//   private calculateTotals(): void {
//     this.total = this.getSubtotal() + this.getTax();
//   }

//   increaseQuantity(item: IProductsPages): void {
//     this.quantity += 1;
//     this.calculateTotals();
//   }

//   decreaseQuantity(item: IProductsPages): void {
//     if (this.quantity > 1) {
//       this.quantity -= 1;
//       this.calculateTotals();
//     }
//   }

// }


import { Component, OnInit } from '@angular/core';
import { IProductsPages } from 'src/Model/i-products-pages';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: IProductsPages[] = [];
  total: number = 0;
  tax: number = 0;
  taxRate: number = 1; 
  quantity:number=1;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItems.forEach(item => item.quantity = 1);
    this.calculateTotals();
  }

  getQuantity(item: IProductsPages): number {
    return item.quantity || 1; 
  }

  getSubtotal(item: IProductsPages): number {
    return item.price * this.getQuantity(item);
  }

  getSubtotalCart(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * this.getQuantity(item)), 0);
  }

  getTax(): number {
    return this.getSubtotalCart() * 0; 
   }

  getTotal(): number {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + this.getSubtotal(item), 0) + this.getTax();
  }

  private calculateTotals(): void {
    this.total = this.getTotal();
  }


  increaseQuantity(item: IProductsPages): void {
    item.quantity = this.getQuantity(item) + 1;
    this.calculateTotals();
  }

  decreaseQuantity(item: IProductsPages): void {
    const quantity = this.getQuantity(item);
    if (quantity > 1) {
      item.quantity = quantity - 1;
      this.calculateTotals();
    }
  }

  removeItemFromCart(item: IProductsPages): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.calculateTotals();
    }
  }
  

}




