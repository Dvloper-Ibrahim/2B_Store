import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showCartDetails(event: MouseEvent, element: HTMLDivElement): void {
    let target: HTMLElement = event.target as HTMLElement;
    // console.log(event.target);
    console.log(target);
    let cartDetails = element.querySelector('.dropdown-div');
    let detailsArrow = element.querySelector('.dropdown-arrow');
    if (
      (target.classList.contains('cart') ||
        target.classList.contains('items-num') ||
        target.classList.contains('fa-cart-plus')) &&
      !cartDetails?.classList.contains('active') &&
      !detailsArrow?.classList.contains('active')
    ) {
      cartDetails?.classList.add('active');
      detailsArrow?.classList.add('active');
    } else if (
      (target.classList.contains('cart') ||
        target.classList.contains('items-num') ||
        target.classList.contains('fa-cart-plus')) &&
      cartDetails?.classList.contains('active') &&
      detailsArrow?.classList.contains('active')
    ) {
      // console.log(element.classList.contains('cart'));
      cartDetails?.classList.remove('active');
      detailsArrow?.classList.remove('active');
    }
  }

  focusOut(event: FocusEvent, element: HTMLElement): void {
    let cartDetails = element.querySelector('.dropdown-div');
    cartDetails?.classList.remove('active');
    let detailsArrow = element.querySelector('.dropdown-arrow');
    detailsArrow?.classList.remove('active');
    console.log(event.target);
  }
}
