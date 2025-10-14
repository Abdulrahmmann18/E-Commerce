import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';

@Component({
  selector: 'app-reset-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.scss'
})
export class ResetPassComponent {
  private authService : AuthService = inject(AuthService);
  private router : Router = inject(Router);
  private navlinksService : NavlinksService = inject(NavlinksService);

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(true, false, false);
  }

  isLoading = signal<boolean>(false);
  responseMsg = signal<string>("");
  responseIsOk = signal<number>(0)

  resetPassForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    newPassword :new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/)])
  })

  submitForm()
  {
    if (this.resetPassForm.valid) {
      this.isLoading.set(true);
      this.authService.resetPassword(this.resetPassForm.value).subscribe({
        next : (res) => {
          this.isLoading.set(false);
          this.responseIsOk.set(1);
          setTimeout(()=>{
            // 1- save token in local storage
            localStorage.setItem('userToken', res.token);
            // 2- service to set user data to be shared to home 
            this.authService.setUserData();
            // 3- go to home page  
            this.router.navigate(['/home']); 
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
