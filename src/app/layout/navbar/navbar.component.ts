import { AuthService } from './../../core/services/auth/auth.service';
import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavlinksService } from '../../core/services/navLinks/navlinks.service';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {


  private navlinksService : NavlinksService = inject(NavlinksService);
  private authService : AuthService = inject(AuthService);
  private router : Router = inject(Router);

  registerLinkState : Signal<boolean> = computed(this.navlinksService.registerLinkState)
  loginLinkState : Signal<boolean> = computed(this.navlinksService.loginLinkState)
  logoutLinkState : Signal<boolean> = computed(this.navlinksService.logoutLinkState)


  logout()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.authService.loginedUserData.next(null);
    this.router.navigate(['/login']);
  }


}
