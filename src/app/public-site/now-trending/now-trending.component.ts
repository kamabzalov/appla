import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';
import { OwlOptions } from 'ngx-owl-carousel-o';

export interface Trend {
  category_id: number;
  count: number;
  name1: string;
  name2: string;
  name3: string;
  picture: string;
  slug: string;
}

@Component({
  selector: 'appla-now-trending',
  templateUrl: './now-trending.component.html',
  styleUrls: ['./now-trending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowTrendingComponent {
  public faStar = iconSet.faStar;

  @Input() trending: Trend[];

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
