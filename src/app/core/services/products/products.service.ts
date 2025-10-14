import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpClient : HttpClient = inject(HttpClient);
  private $products : Observable<any> | null = null;

  getAllProductsAPI() : Observable<any>
  {
    if (!this.$products) {
      this.$products = this.httpClient.get(`${environment.baseURL}products`).pipe(shareReplay(1));
    }
    return  this.$products;
  }

  getSpecProductAPI(pId : string|null) : Observable<any>
  {
    return  this.httpClient.get(`${environment.baseURL}products/${pId}`);
  }
}
