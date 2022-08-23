import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';
import { OwlOptions } from 'ngx-owl-carousel-o';

export interface RecentlyViewed {
  active_status: number;
  category_id: number;
  category_name: string;
  category_slug: string;
  count_similar: number;
  item_model_number: string;
  manufacturer: string;
  name1: string;
  name2: string;
  name3: string;
  price: number;
  product_id: number;
  qty: number;
  show_picture: string;
  slug: string;
  state: string;
  store_id: number;
  store_name: string;
  store_slug: string;
}

@Component({
  selector: 'appla-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyViewedComponent {
  public faEye = iconSet.faEye;

  @Input() recentlyViewed: RecentlyViewed[];

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
}
