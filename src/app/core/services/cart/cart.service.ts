import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private httpClient : HttpClient = inject(HttpClient);

  addProductToCart(pId : string|null) : Observable<any>
  {
    return this.httpClient.post(
      `${environment.baseURL}cart`
      , 
      {
        "productId": pId
      }
    );
  }

  getLoggedUserCart() : Observable<any>
  {
    return this.httpClient.get(
      `${environment.baseURL}cart`
    );
  }

  updateCartProductQuantity(pId : string|null, Pcount : number) : Observable<any>
  {
    return this.httpClient.put(
      `${environment.baseURL}cart/${pId}`
      ,
      {
        "count" : Pcount
      }
    );
  }

  removeSpecificCartItem(pId : string|null) : Observable<any>
  {
    return this.httpClient.delete(
      `${environment.baseURL}cart/${pId}`
    );
  }

  clearUserCart() : Observable<any>
  {
    return this.httpClient.delete(
      `${environment.baseURL}cart`
    );
  }
}
