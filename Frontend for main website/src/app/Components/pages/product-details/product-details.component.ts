import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductsPages } from 'src/Model/i-products-pages';
import { ProductsPagesService } from 'src/app/services/products-pages.service';
import { Location } from '@angular/common';
import { InformatinTableProducts } from 'src/Model/informatin-table-products';
import { RatingApiServiceService } from 'src/app/services/rating-api-service.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  AllProduct: IProductsPages[] = [];
  prodId:number=0;
 @Input() product: IProductsPages | undefined ;
  informationTable: InformatinTableProducts[] = [];

  public NoResults: boolean | undefined;
  
  successMessage:string='';


  constructor(private productApiPages : ProductsPagesService ,
     private activatedRoute: ActivatedRoute , 
     private location :Location,
     private ratingApiService: RatingApiServiceService,private cartService:CartService){}

  
  ngOnInit(): void {
    
    // to cath id of product
    this.prodId=(this.activatedRoute.snapshot.paramMap.get('productId'))?Number(this.activatedRoute.snapshot.paramMap.get('productId')):0;

      this.productApiPages.getproductsById(this.prodId).subscribe(data => {
        this.product = data;
        console.log(this.product);
      });
      
      this.fetchProductDetails();

    }

  // Cart Button 

  addToCart(product: any) {
    try {
      this.cartService.addToCart(product);
      this.successMessage = `Added ${product.name} to cart successfully!`;
      alert(this.successMessage);
    } catch (error) {
      this.successMessage = `Failed to add ${product.name} to cart.`;
      alert(this.successMessage);
    }
  }
  // button go back
  
  goBack(): void {
    this.location.back();
  }

  // Rating 

    getColoredStars(rating: number): number[] {
      const filledStars = Math.floor(rating);
      const emptyStars = 5 - filledStars;
      return Array(filledStars).fill(1).concat(Array(emptyStars).fill(0));
    }

    // product details table 
    activeTab: string = 'details-table'; 



    isBold(str: string): boolean {
      return str.startsWith('<strong>');
    }
    
    // to remove tags from text json detailsTable
  removeTags(str: string): string {
    return str.replace(/<\/?[^>]+(>|$)/g, '');
  }

  // to fetch information Table

  fetchProductDetails() {
    this.productApiPages.getProductInformationTable().subscribe(
      (data) => {
        console.log(data); 
        this.informationTable = data;
      },
      (error) => {
        console.error('Failed to fetch product details:', error);
      }
    );
  }

// filter By subCategoryId 
subCategoryId: number | null = null;

  filterProductsBySubcategory() {
    if (this.subCategoryId !== null) {
      this.AllProduct = this.AllProduct.filter(prod => prod.subCategoryId === this.subCategoryId);
    }
  }


// Fixed div after scroll to show product

fixedDivVisible = false;
// fixedDivHeight = 'auto';

@HostListener('window:scroll', [])
onScroll() {
  this.fixedDivVisible = window.pageYOffset >= 800;
}

getFixedDivStyle() {
  return {
    display: this.fixedDivVisible ? '-webkit-box' : 'none',
  };
}






}
