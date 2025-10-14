import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavlinksService } from '../../core/services/navLinks/navlinks.service';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  registerLinkState = signal<boolean>(false);
  loginLinkState = signal<boolean>(false);
  logoutLinkState = signal<boolean>(false);

  private navlinksService : NavlinksService = inject(NavlinksService);
  private authService : AuthService = inject(AuthService);
  private router : Router = inject(Router);


  ngOnInit(): void {
    this.checkRegisterLinkState();
    this.checkLoginLinkState();
    this.checkLogoutLinkState();
  }

  checkRegisterLinkState(){
    this.navlinksService.registerLinkState.subscribe({
      next : () => {
        this.registerLinkState.set(this.navlinksService.registerLinkState.getValue());
      }
    });
  }
  checkLoginLinkState(){
    this.navlinksService.loginLinkState.subscribe({
      next : () => {
        this.loginLinkState.set(this.navlinksService.loginLinkState.getValue());
      }
    });
    
  }
  checkLogoutLinkState(){
    this.navlinksService.logoutLinkState.subscribe({
      next : () => {
        this.logoutLinkState.set(this.navlinksService.logoutLinkState.getValue());
      }
    });
    
  }

  logout()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.authService.loginedUserData.next(null);
    this.router.navigate(['/login']);
  }


}
