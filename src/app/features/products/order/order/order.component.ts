import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavlinksService } from '../../../../core/services/navLinks/navlinks.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../core/services/order/order.service';


@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  private navlinksService : NavlinksService = inject(NavlinksService);
  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  private orderService : OrderService = inject(OrderService);

  cartId = signal<string|null>("");

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.cartId.set(params.get('cartId'));
    })
  }

  addressForm : FormGroup = new FormGroup({
    details : new FormControl(null, [Validators.required]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^(\+201|00201|01)[0125][0-9]{8}$/)]),
    city : new FormControl(null, [Validators.required])
  })

  submitForm()
  {
    if (this.addressForm.valid) {
      this.orderService.checkoutSession(this.cartId(), this.addressForm.value).subscribe({
        next : (res) => {
          console.log(res); 
          // go to 
          window.location.href = res.session.url;       
        }
      })
    }  
  }
}
