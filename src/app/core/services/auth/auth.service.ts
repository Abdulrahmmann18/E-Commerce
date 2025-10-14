import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient : HttpClient = inject(HttpClient);
  
  loginedUserData : BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  
  signUp(accountData : Object) : Observable<any>
  {
    return this.httpClient.post(`${environment.baseURL}auth/signup`, accountData);
  }
  
  login(accountData : Object) : Observable<any>
  {
    return this.httpClient.post(`${environment.baseURL}auth/signin`, accountData);
  }

  forgetPassword(email : object) : Observable<any>
  {
    return this.httpClient.post(`${environment.baseURL}auth/forgotPasswords`, email);
  }

  verifyResetCode(resetCode : object) : Observable<any>
  {
    return this.httpClient.post(`${environment.baseURL}auth/verifyResetCode`, resetCode);
  }

  resetPassword(resetPassData : object) : Observable<any>
  {
    return this.httpClient.put(`${environment.baseURL}auth/resetPassword`, resetPassData);
  }

  setUserData()
  {
    this.loginedUserData.next(jwtDecode(localStorage.getItem('userToken')!)); 
    localStorage.setItem('userId', this.loginedUserData.getValue()?.id!)  
  }
 
}

