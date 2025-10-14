import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private httpClient : HttpClient = inject(HttpClient);
  private $categories : Observable<any> | null = null;

  getAllCategoriesAPI() : Observable<any>
  {
    if (!this.$categories) {
      this.$categories = this.httpClient.get(`${environment.baseURL}categories`).pipe(shareReplay(1));
    }
    return this.$categories;  
  }
  getSpecCategoryAPI(catId : string) : Observable<any>
  {
    return  this.httpClient.get(`${environment.baseURL}categories/${catId}`);
  }
}
