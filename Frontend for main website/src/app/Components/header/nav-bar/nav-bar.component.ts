import { Component, HostListener } from '@angular/core';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isNavbarFixed = false;
  distanncY = 250;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    if (window.scrollY > this.distanncY) {
      this.isNavbarFixed = true;
      document.querySelector('.navbar')?.classList.add('fixed');
      document.getElementById('totop')?.classList.add('visible');
    } else {
      this.isNavbarFixed = false;
      document.querySelector('.navbar')?.classList.remove('fixed');
      document.getElementById('totop')?.classList.remove('visible');
    }
  }

  // $('.navbar-toggler>li>a').on('click', function(){
  //   $('.navbar-collapse').collapse('hide');
  //   });
}
