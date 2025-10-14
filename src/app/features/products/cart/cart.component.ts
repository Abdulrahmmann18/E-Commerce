import { Component, inject, signal } from '@angular/core';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { Product } from '../../../core/interfaces/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private navlinksService : NavlinksService = inject(NavlinksService);
  private cartService : CartService = inject(CartService);
  private toastrService : ToastrService = inject(ToastrService);
  private router : Router = inject(Router);

  allProducts = signal<Product[]>([]);
  totalPrice = signal<number>(0);
  cartId = signal<string|null>("");

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);
    this.getAllCart();
  }

  getAllCart()
  {
    this.cartService.getLoggedUserCart().subscribe({
      next : (res) => {        
        this.allProducts.set(res.data.products);
        this.totalPrice.set(res.data.totalCartPrice);
        this.cartId.set(res.cartId);
      }
    })
  }

  removeItemThenGetAllCart(pId : string|null)
  {
      // 1- remove from cart
      this.cartService.removeSpecificCartItem(pId).subscribe({
        next : (res) => {
          this.toastrService.success('product is removed from your cart', "cart operations!");
          // 2- get all cart
          this.getAllCart();
        }
      })
  }

  decProductQuantity(pId : string|null, currentCount : number)
  {
    if (currentCount <= 1) {
      this.removeItemThenGetAllCart(pId);
    }
    else {
      // 1- update cart with count--
      this.cartService.updateCartProductQuantity(pId, --currentCount).subscribe({
        next : (res) => {
          this.toastrService.success('product quantity is decremented from your cart', "cart operations!");
          // 2- get all cart
          this.getAllCart();
        }
      })
    }
  }
  
  encProductQuantity(pId : string|null)
  {
    // 1- add to cart
    this.cartService.addProductToCart(pId).subscribe({
      next : (res) => {
        this.toastrService.success(res.message, "cart operations!");
        // 2- get all cart
        this.getAllCart();
      }
    })

  }

  clearCart()
  {
    let confirmRes = confirm('The cart will be deleted, Are you sure? ');
    if (confirmRes) {
      this.cartService.clearUserCart().subscribe({
        next : () => {
          this.toastrService.success("cart is deleted successfully", "cart operations!");
          // 2- get all cart
          this.getAllCart();
        }
      })
    }

  }

  requestOrder()
  {
    // 1- route to order page
    this.router.navigate(['/order', this.cartId()]);
  }

}
