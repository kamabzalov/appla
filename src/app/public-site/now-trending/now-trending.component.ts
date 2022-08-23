import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';
import { RestService } from '@app/services/rest/rest.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';

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
export class NowTrendingComponent implements OnInit {
  public faStar = iconSet.faStar;

  public trending$: Observable<Trend[]>;

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
    this.trending$ = this.restService.getTrends();
  }
}
