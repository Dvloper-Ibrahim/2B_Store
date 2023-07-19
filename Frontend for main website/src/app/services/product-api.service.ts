import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from 'src/Model/i-products';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private httpClient : HttpClient) { }

  getAllProduct():Observable<IProducts[]>{
    return this.httpClient.get<IProducts[]>(`${environment.BaseApiUrl}/products`);
  }

  getproductsById(prodID:number):Observable<IProducts>{
    return this.httpClient.get<IProducts>(`${environment.BaseApiUrl}/products/${prodID}`)
  }
}
