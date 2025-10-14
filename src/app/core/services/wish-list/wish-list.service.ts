import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private httpClient : HttpClient = inject(HttpClient);
  wishlistIds :  BehaviorSubject<(string|null)[]> = new BehaviorSubject<(string|null)[]>([]);    

  addProductToWishlist(pId : string|null) : Observable<any>
  { 
    this.wishlistIds.getValue().push(pId);
    console.log(this.wishlistIds.getValue());
    
    return this.httpClient.post(
      `${environment.baseURL}wishlist`,
      {
        "productId": pId
      }
    )
  }
  removeProductFromWishlist(pId : string|null) : Observable<any>
  {
    this.wishlistIds.next(this.wishlistIds.getValue().filter(item=>item !== pId));
    console.log(this.wishlistIds.getValue());
    return this.httpClient.delete(
      `${environment.baseURL}wishlist/${pId}`
    )
  }
  getLoggedUserWishlist() : Observable<any>
  {
    return this.httpClient.get(
      `${environment.baseURL}wishlist`
    )
  }

  isInWishlist(pId : string|null) : boolean
  {
    return this.wishlistIds.getValue().includes(pId);
  }
}
