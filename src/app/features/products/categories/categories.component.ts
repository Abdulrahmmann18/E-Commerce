import { Component, inject, signal } from '@angular/core';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { CategoryData } from '../../../core/interfaces/category-data';
import { SubCategoriesService } from '../../../core/services/subcategories/sub-categories.service';
import { Subcategory } from '../../../core/interfaces/product-data';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private navlinksService : NavlinksService = inject(NavlinksService);
  private categoriesService : CategoriesService = inject(CategoriesService);
  private subCategoriesService : SubCategoriesService = inject(SubCategoriesService);

  allCategories = signal<CategoryData[]>([] as CategoryData[]);
  subCategories = signal<Subcategory[]>([] as Subcategory[]);
  subCategoriesAreHidden = signal<boolean>(true);
  clickedCatName = signal<string>('');

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);
    this.categoriesService.getAllCategoriesAPI().subscribe({
      next : (res) => {
        this.allCategories.set(res.data)
        console.log(this.allCategories());
      }
    })
  }

  getAllSubCategories(catId : string|null, catName : string)
  {
    this.subCategoriesService.getAllSubCategoriesOnCategory(catId).subscribe(
      (res) => {
        this.subCategoriesAreHidden.set(false);
        this.subCategories.set(res.data);
        this.clickedCatName.set(catName);
      }
    )
  }
}
