import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductsPages } from 'src/Model/i-products-pages';
import { InformatinTableProducts } from 'src/Model/informatin-table-products';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsPagesService {

  constructor(private httpClient : HttpClient) { this.loadBrandsAndCounts(); }

  getAllProduct():Observable<IProductsPages[]>{
    return this.httpClient.get<IProductsPages[]>(`${environment.BaseApiUrl}/productsPages`);
  }

  getproductsByName(prodName:string):Observable<IProductsPages>{
    return this.httpClient.get<IProductsPages>(`${environment.BaseApiUrl}/productsPages/${prodName}`)
  }

  getproductsById(prodId:number):Observable<IProductsPages>{
    return this.httpClient.get<IProductsPages>(`${environment.BaseApiUrl}/productsPages/${prodId}`)
  }

  getProductInformationTable(): Observable<InformatinTableProducts[]> {
    return this.httpClient.get<InformatinTableProducts[]>(`${environment.BaseApiUrl}/productsPages`);
  }



  ///     Filter for brand 
 
  private brands: string[] = [];
  private brandCount: { [brand: string]: number } = {};

  private loadBrandsAndCounts() {
    this.httpClient.get<IProductsPages[]>(`${environment.BaseApiUrl}/productsPages`).subscribe(data => {
      data.forEach(product => {
        const brand = product.brand?.trim();
        if (brand) {
          if (!this.brands.includes(brand)) {
            this.brands.push(brand);
            this.brandCount[brand] = 1;
          } else {
            this.brandCount[brand]++;
          }
        }
      });
    });
  }


  getBrands(): string[] {
    return this.brands;
  }

  getBrandCount(brand: string): number {
    return this.brandCount[brand] || 0;
  }
}


