import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavlinksService {

  registerLinkState : WritableSignal<boolean> = signal<boolean>(true);
  loginLinkState : WritableSignal<boolean> = signal<boolean>(false);
  logoutLinkState : WritableSignal<boolean> = signal<boolean>(false);


  setNavLinksStates(regState : boolean, loginState : boolean, logoutState : boolean)
  {
    this.registerLinkState.set(regState);
    this.loginLinkState.set(loginState);
    this.logoutLinkState.set(logoutState);
  }
  
}
