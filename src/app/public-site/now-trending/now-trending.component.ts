import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';
import { OwlOptions } from 'ngx-owl-carousel-o';

export interface Trend {
  category_id: number;
  count: number;
  name: string;
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

  @Input() public trending: Trend[];

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
        items: 2,
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
