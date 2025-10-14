import { HttpInterceptorFn } from '@angular/common/http';
import { MyPlatformService } from '../../services/myPlatform/my-platform.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let myPlatformService : MyPlatformService = inject(MyPlatformService);
  
  if (myPlatformService.checkPlatformBrowser()) 
  {
    if (localStorage.getItem('userToken')) {
      let userTokenHeader : any = {token : localStorage.getItem('userToken')};
      req = req.clone(
        {
          setHeaders : userTokenHeader
        }
      ) 
    }
 
  }
  return next(req);
};
