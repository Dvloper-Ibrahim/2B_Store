import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { CartDropdownDirective } from './Directives/cart-dropdown.directive';
import { FooterComponent } from './Components/footer/footer.component';
import { NavBarComponent } from './Components/header/nav-bar/nav-bar.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CaroseleShow1Component } from './Components/home-page/carosele-show1/carosele-show1.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,

    HomePageComponent,
    HeaderComponent,
    CartDropdownDirective,
    FooterComponent,
    NavBarComponent,
    CaroseleShow1Component,
    NotFoundComponent,
    SignInComponent,
    CreateAccountComponent,
  ],

  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
