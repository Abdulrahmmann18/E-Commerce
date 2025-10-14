import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  private httpClient : HttpClient = inject(HttpClient);

  getAllSubCategories() : Observable<any>
  {
    return this.httpClient.get(`${environment.baseURL}subcategories`);  
  }
  getSpecSubCategory(subCategoryId : string|null) : Observable<any>
  {
    return  this.httpClient.get(`${environment.baseURL}subcategories/${subCategoryId}`);
  }
  getAllSubCategoriesOnCategory(CategoryId : string|null) : Observable<any>
  {
    return  this.httpClient.get(`${environment.baseURL}categories/${CategoryId}/subcategories`);
  }
}
