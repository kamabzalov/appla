import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  SearchCategory,
  SearchProduct,
} from '@app/public-site/search/search-results/search-results.component';
import { RestService } from '@app/services/rest/rest.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'appla-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultCardComponent {
  @Input() public categories: SearchCategory[];
  @Input() public product: SearchProduct;
  @Output() public clickOnCategory: EventEmitter<string> =
    new EventEmitter<string>();
  protected currentLang: string;
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
        items: 6,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  constructor(
    private restService: RestService,
    private router: Router,
    private localizeRouterService: LocalizeRouterService
  ) {}

  protected goToProduct(product: SearchProduct) {
    this.currentLang = this.localizeRouterService.parser.currentLang;
    this.restService
      .getProductByMasterId(product.master_product_id)
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        // eslint-disable-next-line no-magic-numbers
        if (result) {
          // eslint-disable-next-line no-magic-numbers
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

  protected categoryClick(category_slug: string) {
    this.clickOnCategory.emit(category_slug);
  }
}
