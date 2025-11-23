import { CategoriesService } from './../../../core/services/categories/categories.service';
import { Component, inject, signal } from '@angular/core';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { CategoriesSliderComponent } from './categories-slider/categories-slider.component';
import { ProductsComponent } from '../../../shared/products/products.component';
import { CategoryData } from '../../../core/interfaces/category-data';
import { WishListService } from '../../../core/services/wish-list/wish-list.service';

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, CategoriesSliderComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private navlinksService : NavlinksService = inject(NavlinksService);
  private categoriesService : CategoriesService = inject(CategoriesService);
  private wishListService : WishListService = inject(WishListService);

  allCategories = signal<CategoryData[]>([] as CategoryData[]);

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);
    this.wishListService.getLoggedUserWishlist().subscribe({
      next : (res) => {
        this.wishListService.wishlistIds.next(res.data.map((item : any) => item._id));
      }
    })
    this.categoriesService.getAllCategoriesAPI().subscribe({
      next : (res) => {
        this.allCategories.set(res.data)
      }
    })
  }

}
