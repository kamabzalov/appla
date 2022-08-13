import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';
import { Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RestService } from '@app/services/rest/rest.service';

export interface RecentlyViewed {
  active_status: number;
  category_id: number;
  category_name: string;
  category_slug: string;
  count_similar: number;
  item_model_number: number;
  manufacturer: string;
  name1: string;
  name2: string;
  name3: string;
  picture: string;
  price: string;
  product_id: string;
  qty: string;
  show_picture: string;
  slug: string;
  state: string;
  store_id: string;
  store_name: string;
  store_slug: string;
}

@Component({
  selector: 'appla-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyViewedComponent implements OnInit {
  public faEye = iconSet.faEye;

  public recentlyViewed$: Observable<RecentlyViewed[]>;

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
    this.recentlyViewed$ = this.restService.getRecentlyViewed();
  }
}
