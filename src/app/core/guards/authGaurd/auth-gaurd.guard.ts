import { MyPlatformService } from './../../services/myPlatform/my-platform.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGaurdGuard: CanActivateFn = (route, state) => {

  let router : Router = inject(Router);
  let myPlatformService : MyPlatformService = inject(MyPlatformService);
  

  if (myPlatformService.checkPlatformBrowser()) {
    // in browser side
    if (localStorage.getItem('userToken')) {
      // user is already logined ==> activate
      return true;
    }
  }
  return router.createUrlTree(['/login']);
};
