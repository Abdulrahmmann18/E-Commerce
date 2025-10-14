import { AuthService } from './../../../../core/services/auth/auth.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavlinksService } from '../../../../core/services/navLinks/navlinks.service';
import { OrderService } from '../../../../core/services/order/order.service';
import { StripUserOrders } from '../../../../core/interfaces/strip-user-orders';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{

  private navlinksService : NavlinksService = inject(NavlinksService);
  private orderService : OrderService = inject(OrderService);
  userId : string|null = localStorage.getItem('userId');
  stripeUserOrders = signal<StripUserOrders[]>([]);

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);
    this.orderService.getUserOrders(this.userId).subscribe(
      (res) => {
        this.stripeUserOrders.set(res);
        console.log(res);
        
      }
    )
  }
}

