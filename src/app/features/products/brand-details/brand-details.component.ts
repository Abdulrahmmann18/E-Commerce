import { ActivatedRoute } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { NavlinksService } from '../../../core/services/navLinks/navlinks.service';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { BrandData } from '../../../core/interfaces/brand-data';

@Component({
  selector: 'app-brand-details',
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent {
  private navlinksService : NavlinksService = inject(NavlinksService);
  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  private brandsService : BrandsService = inject(BrandsService);



  brandId : string|null = "";
  brandInfo = signal<BrandData>({} as BrandData)

  ngOnInit(): void {
    this.navlinksService.setNavLinksStates(false, false, true);

    this.activatedRoute.paramMap.subscribe(
      (param) => {
        this.brandId =  param.get('brandtId');
        this.brandsService.getSpecBrandAPI(this.brandId).subscribe({
          next : (res) => {
            this.brandInfo.set(res.data);
            console.log(res.data);
          }
        })
      }
    )


  }
}
