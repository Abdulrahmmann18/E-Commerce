import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, signal } from '@angular/core';
import { NavlinksService } from '../../core/services/navLinks/navlinks.service';
import { ProductData } from '../../core/interfaces/product-data';
import { CardComponent } from '../../features/products/card/card.component';
import { WishListService } from '../../core/services/wish-list/wish-list.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [CardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private navlinksService : NavlinksService = inject(NavlinksService);
  private productsService : ProductsService = inject(ProductsService);
  private wishListService : WishListService = inject(WishListService);
  
  allProducts = signal<ProductData[]>([] as ProductData[]);
  userInput : string = '';

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);
    this.productsService.getAllProductsAPI().subscribe({
      next : (res) => {
        this.allProducts.set(res.data);
      }
    })
    this.wishListService.getLoggedUserWishlist().subscribe({
      next : (res) => {
        this.wishListService.wishlistIds.next(res.data.map((item : any) => item._id));
        console.log(this.wishListService.wishlistIds.getValue());
      }
    })
  }


}
