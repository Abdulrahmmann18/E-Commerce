import { Component, inject, signal } from '@angular/core';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { WishListService } from '../../../core/services/wish-list/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishListProduct } from '../../../core/interfaces/wish-list-product';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  private navlinksService : NavlinksService = inject(NavlinksService);
  private wishListService : WishListService = inject(WishListService);
  private cartService : CartService = inject(CartService);
  private toastrService : ToastrService = inject(ToastrService);

  allProducts = signal<WishListProduct[]>([]);

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);
    this.getAllWishlist();
  }

  getAllWishlist(){
    this.wishListService.getLoggedUserWishlist().subscribe({
      next : (res) => {
        this.allProducts.set(res.data);
      }
    })
  }

  removeItemFromWishList(pId : string|null)
  {
      // 1- remove from wish list
      this.wishListService.removeProductFromWishlist(pId).subscribe({
        next : (res) => {
          this.toastrService.success('product is removed from your Wish List', "Wish List operations!");
          // 2- get all wishlist
          this.getAllWishlist();
        }
      })
  }

  addItemToCart(pId : string|null){
    // 1- add to cart
    this.cartService.addProductToCart(pId).subscribe({
      next : (res) => {
        this.toastrService.success(res.message, "cart operations!");
      }
    })
    // 2- remove from wishlist
    this.removeItemFromWishList(pId);
  }
}
