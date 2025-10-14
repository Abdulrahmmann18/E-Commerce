import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavlinksService {

  registerLinkState : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loginLinkState : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  logoutLinkState : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  setNavLinksStates(regState : boolean, loginState : boolean, logoutState : boolean)
  {
    this.registerLinkState.next(regState);
    this.loginLinkState.next(loginState);
    this.logoutLinkState.next(logoutState);
  }
  
}
