import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavlinksService } from './../../../core/services/navLinks/navlinks.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {

  private navlinksService : NavlinksService = inject(NavlinksService);
  private authService : AuthService = inject(AuthService);
  private router : Router = inject(Router);

  isLoading = signal<boolean>(false);
  responseMsg = signal<string>("");
  responseIsOk = signal<number>(0)

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(true, true, false);
  }

  forgetPassForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email])
  })

  submitForm()
  {
    if (this.forgetPassForm.valid) {
      this.isLoading.set(true);
      this.authService.forgetPassword(this.forgetPassForm.value).subscribe({

        next : (res) => {
          this.isLoading.set(false);
          this.responseIsOk.set(1);
          this.responseMsg.set(res.message);
          setTimeout(()=>{
            // 3- go to reset Password Code Page  
            this.router.navigate(['/resetPassCode']); 
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
