import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductsPages } from 'src/Model/i-products-pages';
import { ProductsPagesService } from 'src/app/services/products-pages.service';
import { Location } from '@angular/common';


type MenuState = 'showMain' | 'showLaptopsMenu' | 'showElectronicSolutionsMenu' | 'showPrintersMenu' | 'showDesctopsMenu' | 'showBuildPcMenu';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit  {

  
  AllProduct: IProductsPages[] = [];

  product: any;
  category:string='';
  subCategory:string = '';
  subSubCategory:string='';
  currentMainCategory: string = '';

  // route 
  selectedCategory: string = '';
  selectedSubCategory: string = '';
  selectedSubSubCategory: string = '';

  constructor(private productApiPages: ProductsPagesService , private router:Router , private location :Location,
    private route: ActivatedRoute
    ) {}



 

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }

  // **************************************************************************
  
  showMain: boolean = true;
  showLaptopsMenu: boolean = false;
  showElectronicSolutionsMenu: boolean = false;
  showPrintersMenu: boolean = false;
  showDesctopsMenu: boolean = false;
  showBuildPcMenu: boolean = false;
  
  toggleMenu(menu: MenuState) {
    const menuState = this[menu];
    for (const key in this) {
      if (this.hasOwnProperty(key) && typeof this[key as MenuState] === 'boolean' && key !== menu) {
        this[key as MenuState] = false;
      }
    }
    this[menu] = !menuState;
  }

  // **************************************************************************


  setCat(value: string):void {
    this.category=value;
    this.subCategory = '';
    this.subSubCategory = '';
    this.router.navigate(['home/computer'], { queryParams: { category: this.selectedCategory } });

  }

  setSubCat(value : string): void{
    this.subCategory = value;
    this.subSubCategory = '';
    this.router.navigate(['home/computer'], { queryParams: { category: this.selectedCategory, subCategory: this.selectedSubCategory } });

  }


  
  setSubSubCategory(value: string):void {
    this.subSubCategory=value;
    this.router.navigate(['home/computer'], { queryParams: { category: this.selectedCategory, subCategory: this.selectedSubCategory, subSubCategory:this.selectedSubSubCategory } });

  }

  // method to go back to the main menu
  goBackToMain():void {
    // this.showMain = true;
    // this.showLaptopsMenu = false;
    // this.showPrintersMenu=false;
    // this.showBuildPcMenu=false;
    // this.showElectronicSolutionsMenu=false;
    // this.showDesctopsMenu=false;
    this.location.back();

  }


  // Dropdowen check box for filter Brand

//   brands: string[] = ["Acer", "Apple", "Asus", "Dell", "HP", "HUAWEI", "Lenovo", "MSI", "Itel"];
//   selectedBrands: string[] = [];

//   onBrandCheckboxChange(brand: string, isChecked: boolean) {
//     if (isChecked) {
//       this.selectedBrands.push(brand);
//     } else {
//       this.selectedBrands = this.selectedBrands.filter(item => item !== brand);
//     }

// }


// brand check box 

brands: string[] = [];

showBrandMenu: boolean = false;

toggleBrandMenu() {
  this.showBrandMenu = !this.showBrandMenu;
}

selectedBrands: string[] = [];

updateBrandsList() {
  // جلب جميع العلامات التجارية الموجودة في القائمة AllProduct
  const allBrands = this.AllProduct.map(prod => prod.brand?.trim()).filter(Boolean) as string[];
  // إزالة العلامات التجارية المكررة
  this.brands = allBrands.filter((brand, index) => allBrands.indexOf(brand) === index);
}

onBrandCheckboxChange() {
  // Update the product list based on the selected brands
  this.productApiPages.getAllProduct().subscribe(data => {
    this.AllProduct = data.filter(prod => {
      // If no brands are selected, show all products
      if (this.selectedBrands.length === 0) {
        return true;
      }
      // If brands are selected, only show products that belong to any of these brands
      return this.selectedBrands.includes(prod.brand?.trim()  || '');
    });
    this.updateBrandsList();

  });
}

getBrandCount(brand: string): number {
  return this.AllProduct.filter(prod => prod.brand?.trim() === brand).length;
}

ngOnInit(): void {
  this.productApiPages.getAllProduct().subscribe(data => {
    this.AllProduct = data.filter(prod => prod.categoryName.toLowerCase() === 'computer');
    this.updateBrandsList();
  });

  this.route.queryParamMap.subscribe(params => {
    this.category = params.get('category') || '';
    this.subCategory = params.get('subCategory') || '';
    this.subSubCategory = params.get('subSubCategory') || '';
  });
}
}