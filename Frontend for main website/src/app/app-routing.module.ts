import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { CorporateSolutionsComponent } from './Components/corporate-solutions/corporate-solutions.component';
import { ProductsPagesComponent } from './Components/pages/products-pages/products-pages.component';
import { ComputerComponent } from './Components/pages/computer/computer.component';
import { FreeShippingComponent } from './Components/home-page/free-shipping/free-shipping.component';
import { ProductDetailsComponent } from './Components/pages/product-details/product-details.component';
import { CartComponent } from './Components/cart/cart.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title: '2B Egypt-Buy Online|laptops|Mobiles|Gaming best prices in Egypt',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Sign In',
  },
  {
    path: 'customer/account/create',
    component: CreateAccountComponent,
    title: 'Create Account',
  },
  {path:'home/computer',component:ComputerComponent,title:'computer'},
  {path:'product/:productId',component:ProductDetailsComponent,title:'Product Details'},
  {path:'home/corporateSolutions'  ,component: CorporateSolutionsComponent ,title:'Corporate Solutions'},
  {path:'home/shipping' , component:FreeShippingComponent,title:'free shipping'},
  {path:'cart',component:CartComponent,title:'cart'},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
