import { Component, inject, Input, signal } from '@angular/core';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { BrandData } from '../../../core/interfaces/brand-data';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private navlinksService : NavlinksService = inject(NavlinksService);
  private brandsService : BrandsService = inject(BrandsService);

  allBrands = signal<BrandData[]>([] as BrandData[]);

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);

    this.brandsService.getAllBrands().subscribe({
      next : (res) => {
        console.log(res.data);
        this.allBrands.set(res.data);
      }
    })
  }
}
