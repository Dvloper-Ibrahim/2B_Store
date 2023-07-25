import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent   implements OnInit {

// *********************************************
                  //  filter 
                  
  // ********************************************
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

// **************************************************
            //  route to apply nav elements
            
   selectedCategory: string = '';
  selectedSubCategory: string = '';
  selectedSubSubCategory: string = '';


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setCat(category: string) {
    this.selectedCategory = category;
    this.router.navigate(['home/computer'], { queryParams: { category: this.selectedCategory } });
  }
  
  setSubCat(subCategory: string) {
    this.selectedSubCategory = subCategory;
    this.router.navigate(['home/computer'], { queryParams: { category: this.selectedCategory, subCategory: this.selectedSubCategory } });
  }


  setSubSubCat(subSubCategory: string) {
    this.selectedSubSubCategory = subSubCategory;
    this.router.navigate(['home/computer'], { queryParams: { category: this.selectedCategory, subCategory: this.selectedSubCategory , subSubCategory: this.selectedSubSubCategory } });
  }

         
}