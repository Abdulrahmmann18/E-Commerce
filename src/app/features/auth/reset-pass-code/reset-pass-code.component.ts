import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-pass-code',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-pass-code.component.html',
  styleUrl: './reset-pass-code.component.scss'
})
export class ResetPassCodeComponent {
  private navlinksService : NavlinksService = inject(NavlinksService);
  private authService : AuthService = inject(AuthService);
  private router : Router = inject(Router);

  isLoading = signal<boolean>(false);
  responseMsg = signal<string>("");
  responseIsOk = signal<number>(0)

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(true, true, false);
  }

  resetPassCodeForm : FormGroup = new FormGroup({
    resetCode : new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)])
  })

  submitForm()
  {
    if (this.resetPassCodeForm.valid) {
      this.isLoading.set(true);
      this.authService.verifyResetCode(this.resetPassCodeForm.value).subscribe({

        next : (res) => {
          this.isLoading.set(false);
          this.responseIsOk.set(1);
          this.responseMsg.set(res.status);
          setTimeout(()=>{
            // 3- go to reset Password Page  
            this.router.navigate(['/resetPass']); 
          }, 2000);
        },
        error : (err) => {   
          this.isLoading.set(false);
          this.responseIsOk.set(-1);   
          this.responseMsg.set(err.error.message)
        }

      }
      )
    }  
  }
}
