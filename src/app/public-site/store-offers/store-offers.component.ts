import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '@app/services/rest/rest.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { iconSet } from '@app/shared/utils/icons';

export interface StoreOffers {
  category_id: number;
  count_store: number;
  master_product_id: number;
  max_price: number;
  min_price: number;
  name1: string;
  name2: string;
  name3: string;
  picture: string;
  slug: string;
}

@Component({
  selector: 'appla-store-offers',
  templateUrl: './store-offers.component.html',
  styleUrls: ['./store-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOffersComponent implements OnInit {
  public readonly faStar = iconSet.faStar;

  public storeOffers$: Observable<StoreOffers[]>;

  public readonly customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  constructor(private readonly restService: RestService) {}

  public ngOnInit() {
    this.storeOffers$ = this.restService.getStoreOffers();
  }
}
