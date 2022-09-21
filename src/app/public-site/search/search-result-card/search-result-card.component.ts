import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  SearchCategory,
  SearchProduct,
} from '@app/public-site/search/search-results/search-results.component';
import { RestService } from '@app/services/rest/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'appla-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultCardComponent implements OnDestroy {
  @Input() public categories: SearchCategory[];
  @Input() public product: SearchProduct;
  protected currentLang: string;
  protected readonly customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
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
        items: 6,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  private subscription: Subscription;

  constructor(
    private restService: RestService,
    private router: Router,
    private localizeRouterService: LocalizeRouterService
  ) {}

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected goToProduct(product: SearchProduct) {
    this.currentLang = this.localizeRouterService.parser.currentLang;
    this.subscription = this.restService
      .getProductByMasterId(product.master_product_id)
      .subscribe(result => {
        // eslint-disable-next-line no-magic-numbers
        if (result) {
          if (result.length === 1) {
            this.router.navigate([
              `/${this.currentLang}/product/${result[0].store_slug}/${result[0].product_slug}`,
            ]);
          } else {
            this.router.navigate(
              [
                `/${this.currentLang}/category/product_list/${result[0].product_slug}`,
              ],
              { queryParams: { mpi: product.master_product_id } }
            );
          }
        }
      });
  }
}
