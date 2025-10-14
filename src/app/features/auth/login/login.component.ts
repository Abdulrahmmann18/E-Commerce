import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { WishListService } from '../../../core/services/wish-list/wish-list.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private authService : AuthService = inject(AuthService);
  private router : Router = inject(Router);
  private navlinksService : NavlinksService = inject(NavlinksService);
  private wishListService : WishListService = inject(WishListService);

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(true, false, false);
  }

  isLoading = signal<boolean>(false);
  responseMsg = signal<string>("");
  responseIsOk = signal<number>(0)

  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required])
  })


  submitForm()
  {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.login(this.loginForm.value).subscribe({
        next : (res) => {
          this.isLoading.set(false);
          this.responseIsOk.set(1);
          this.responseMsg.set(res.message);

          setTimeout(()=>{
            // 1- save token in local storage
            localStorage.setItem('userToken', res.token);
            // 2- service to set user data to be shared to home 
            this.authService.setUserData();
            // 3- go to home page  
            this.router.navigate(['/home']); 
            this.wishListService.getLoggedUserWishlist().subscribe({
              next : (res) => {
                this.wishListService.wishlistIds.next(res.data.map((item : any) => item._id));
                console.log(this.wishListService.wishlistIds.getValue());
              }
            })
          }, 1000);
        },
        error : (err) => {   
          this.isLoading.set(false);
          this.responseIsOk.set(-1);   
          this.responseMsg.set(err.error.message)


        }
      }) 
    }  
  }
}
