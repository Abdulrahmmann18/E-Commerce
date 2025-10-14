import { CartService } from './../../../core/services/cart/cart.service';
import { Component, EventEmitter, inject, Input, Output, OnInit, signal } from '@angular/core';
import { ProductData } from '../../../core/interfaces/product-data';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wish-list/wish-list.service';


@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit  {

  private cartService : CartService = inject(CartService);
  private toastrService : ToastrService = inject(ToastrService);
  private wishListService : WishListService = inject(WishListService);
  
  @Input() oneProduct : ProductData = {} as ProductData;

  checked = signal<boolean>(false);
  id = Math.random().toString(36).substring(2, 9); // unique id

  ngOnInit(): void {
    this.checked.set(this.wishListService.isInWishlist(this.oneProduct._id));
  }

  onToggle(event: Event, pId : string|null) {
    this.checked.set(!this.checked());
    if (this.checked()) {
      this.wishListService.addProductToWishlist(pId).subscribe({
        next : (res) => {
          this.toastrService.success(res.message, "Wish List operations!");
        }
      });
    }
    else {
      // remove from wish list
      this.wishListService.removeProductFromWishlist(pId).subscribe({
        next : (res) => {
          console.log(res.message);
          this.toastrService.success(res.message, "Wish List operations!");
        }
      });
    }
  }

  addToCart(pId : string|null)
  {
    this.cartService.addProductToCart(pId).subscribe({
      next : (res) => {
        console.log(res.message);
        this.toastrService.success(res.message, "cart operations!");
      }
    })
  }

}
