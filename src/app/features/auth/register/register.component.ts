import { NavlinksService } from './../../../core/services/navLinks/navlinks.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  private authService : AuthService = inject(AuthService);
  private router : Router = inject(Router);
  private navlinksService : NavlinksService = inject(NavlinksService);

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, true, false);     
  }
  
  isLoading = signal<boolean>(false);
  responseMsg = signal<string>("");
  responseIsOk = signal<number>(0);

  registerForm : FormGroup = new FormGroup({
    name : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/)]),
    rePassword : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/)]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^(\+201|00201|01)[0125][0-9]{8}$/)])
  }, this.comparePasswords)

  comparePasswords(g : AbstractControl)
  {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    }
    else {
      return {'notMatched' : true};
    }
  }

  submitForm()
  {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.authService.signUp(this.registerForm.value).subscribe({
        next : (res) => {
          this.isLoading.set(false);
          this.responseIsOk.set(1);
          this.responseMsg.set(res.message);

          // go to login page
          setTimeout(()=>{           
            this.router.navigate(['/login']);            
          }, 2000);
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
