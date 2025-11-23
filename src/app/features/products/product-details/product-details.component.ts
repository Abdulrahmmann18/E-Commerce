import { ProductData } from './../../../core/interfaces/product-data';
import { ProductsService } from './../../../core/services/products/products.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wish-list/wish-list.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private navlinksService : NavlinksService = inject(NavlinksService);
  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  private productsService : ProductsService = inject(ProductsService);
  private wishListService : WishListService = inject(WishListService);
  private cartService : CartService = inject(CartService);
  private toastrService : ToastrService = inject(ToastrService);

  pId : string|null = "";
  pInfo = signal<ProductData>({} as ProductData);
  checked : boolean = false;
  id = Math.random().toString(36).substring(2, 9); // unique id

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);
    this.activatedRoute.paramMap.subscribe(
      (param) => {     
        this.pId =  param.get('productId');
        this.productsService.getSpecProductAPI(this.pId).subscribe({
          next : (res) => {
            this.pInfo.set(res.data);         
            this.checked = this.wishListService.isInWishlist(this.pInfo()._id);
          }
        })
      }
    )

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ["", ""],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 }
    }
  };
  
  onToggle(event: Event) {
    this.checked = !this.checked;
    if (this.checked) {
      this.wishListService.addProductToWishlist(this.pId).subscribe({
        next : (res) => {
          this.toastrService.success(res.message, "Wish List operations!");
        }
      });
    }
    else {
      // remove from wish list
      this.wishListService.removeProductFromWishlist(this.pId).subscribe({
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
        this.toastrService.success(res.message, "cart operations!");
      }
    })
  }
}
