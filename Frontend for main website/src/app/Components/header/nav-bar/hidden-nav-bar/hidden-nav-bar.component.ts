import { Component } from '@angular/core';

@Component({
  selector: 'app-hidden-nav-bar',
  templateUrl: './hidden-nav-bar.component.html',
  styleUrls: ['./hidden-nav-bar.component.css']
})
export class HiddenNavBarComponent {
  isDropdownOpen: boolean[] = [false, false, false, false, false,false];

  toggleDropdown(index: number) {
    this.isDropdownOpen[index] = !this.isDropdownOpen[index];
  }

  
// Cart Details 
isDropdownActive = false;

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
  }

