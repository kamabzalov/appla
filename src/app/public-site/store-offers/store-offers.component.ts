import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { iconSet } from '@app/shared/utils/icons';

export interface StoreOffers {
  category_id: number;
  count_store: number;
  master_product_id: number;
  max_price: number;
  min_price: number;
  name: string;
  picture: string;
  slug: string;
}

@Component({
  selector: 'appla-store-offers',
  templateUrl: './store-offers.component.html',
  styleUrls: ['./store-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOffersComponent {
  public readonly faStar = iconSet.faStar;

  @Input() public storeOffers: StoreOffers[];

  protected readonly customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<button>&#x2039;</button>', '<button>&#x203A;</button>'],
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
        items: 3,
      },
    },
    nav: true,
  };
}
