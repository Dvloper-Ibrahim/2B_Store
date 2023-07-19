import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { CartDropdownDirective } from './Directives/cart-dropdown.directive';
import { FooterComponent } from './Components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './Components/header/nav-bar/nav-bar.component';
import { CarouselHome1Component } from './Components/home-page/carousel-home1/carousel-home1.component';
import { HomeAppliancesOffersComponent } from './Components/home-page/home-appliances-offers/home-appliances-offers.component';
import { PersonalCareOffersComponent } from './Components/home-page/personal-care-offers/personal-care-offers.component';
import { RecommendedOfferComponent } from './Components/home-page/recommended-offer/recommended-offer.component';
import { Section2ButtonComponent } from './Components/home-page/section2-button/section2-button.component';
import { Section3IconComponent } from './Components/home-page/section3-icon/section3-icon.component';
import { HiddenNavBarComponent } from './Components/header/nav-bar/hidden-nav-bar/hidden-nav-bar.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { CorporateSolutionsComponent } from './Components/corporate-solutions/corporate-solutions.component';
import { ProductHomeComponent } from './Components/home-page/product-home/product-home.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,

    HomePageComponent,
    HeaderComponent,
    CartDropdownDirective,
    FooterComponent,
    NavBarComponent,
    CarouselHome1Component,
    HomeAppliancesOffersComponent,
    PersonalCareOffersComponent,
    RecommendedOfferComponent,
    Section2ButtonComponent,
    Section3IconComponent,
    HiddenNavBarComponent,
    NotFoundComponent,
    SignInComponent,
    CreateAccountComponent,
    CorporateSolutionsComponent,
    ProductHomeComponent,
  ],

  imports: [
    BrowserModule,
     AppRoutingModule,
     NgbModule,
     HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
