import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyPlatformService {
  
  private pLATFORM_ID : Object = inject(PLATFORM_ID);

  checkPlatformBrowser()
  {
    return isPlatformBrowser(this.pLATFORM_ID); 
  }
}
