import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private httpClient : HttpClient = inject(HttpClient);
  private $brands : Observable<any> | null = null;

  getAllBrands() : Observable<any>
  {
    if (!this.$brands) {
      this.$brands = this.httpClient.get(`${environment.baseURL}brands`).pipe(shareReplay(1));
    }
    return this.$brands;  
  }
  getSpecBrandAPI(brandId : string|null) : Observable<any>
  {
    return  this.httpClient.get(`${environment.baseURL}brands/${brandId}`);
  }
}
