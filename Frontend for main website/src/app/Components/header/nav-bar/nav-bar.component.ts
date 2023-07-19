import { Component ,  HostListener } from '@angular/core';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  {

  isNavbarFixed = false;
  distanncY=250;
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) { 
    if (window.scrollY > this.distanncY) {
      this.isNavbarFixed = true;
      document.querySelector('.navbar')?.classList.add('fixed');
    } else {
      this.isNavbarFixed = false;
      document.querySelector('.navbar')?.classList.remove('fixed');
    }
  }

  // to show side bar in hidden bar 
  showSideBar= false;

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
  }
// to close side bar from any where 
  closeSideBar() {
    this.showSideBar = false;
  }

// to close element of side bar on click 
  isItemOpen= false;

  toggleItem() {
    this.isItemOpen = !this.isItemOpen;
  }
 
// to show and hidden search input in small screen
isSearchActive: boolean = false;

toggleSearch() {
  this.isSearchActive = !this.isSearchActive;
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