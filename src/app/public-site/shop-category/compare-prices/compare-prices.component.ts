import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { iconSet } from '@app/shared/utils/icons';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language/language.service';

export interface ProductOffer {
  category: ProductOfferCategory;
  master_product_info: ProductOfferInfo;
  rating: number;
  stories: ProductOfferStores[];
  similar_short: ProductOfferSimilar[];
}

interface ProductOfferCategory {
  category_id: number;
  level: number;
  name: string;
  parent_id: number;
  picture: string;
  product_variant: string;
  search_field: string;
  slug: string;
}

interface ProductOfferInfo {
  technical_detail: { [key: string]: any };
  master_product_id: number;
  category_id: number;
  name: string;
  long_description: string;
  short_description: string;
  item_model_number: number;
  manufacturer: string;
  picture: string;
}

interface ProductOfferStores {
  store_id: number;
  name: string;
  active: number;
  avatar: string;
  delivery_method: number;
  description: string;
  free_delivery: number;
  max_delivery: number;
  min_delivery: number;
  store_slug: string;
  user_frontend_id: number;
  product_slug: string;
  product_id: number;
  price: number;
  raiting: number;
}

interface ProductOfferSimilar {
  product_id: number;
  name: string;
  picture: string;
  price: number;
  discount: number;
  qty: number;
  store_id: number;
  category_id: number;
  product_slug: string;
  stars: number;
  store_slug: string;
}

@Component({
  selector: 'appla-compare-prices',
  templateUrl: './compare-prices.component.html',
  styleUrls: ['./compare-prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparePricesComponent implements OnInit, OnDestroy {
  protected faTruck = iconSet.faTruck;
  protected productOffer$: Observable<ProductOffer>;
  // eslint-disable-next-line no-magic-numbers
  protected maxRating: number = 5;
  protected appLang: string;
  private productOfferUrl$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: RestService,
    private languageService: LanguageService
  ) {}

  public ngOnInit() {
    this.appLang = this.languageService.currentAppLang$.getValue().code;
    this.productOfferUrl$ = combineLatest(
      this.route.queryParams,
      this.route.params
    ).subscribe(res => {
      // eslint-disable-next-line no-magic-numbers
      if (res && res.length > 1) {
        const mpi = +res[0]['mpi'];
        const productSlug = res[1]['slug'];
        this.productOffer$ = this.restService.getProductOffer(productSlug, mpi);
      }
    });
  }

  public ngOnDestroy() {
    if (this.productOfferUrl$) {
      this.productOfferUrl$.unsubscribe();
    }
  }

  protected goToProductSpec() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams && queryParams['mpi']) {
      this.router.navigate([], {
        fragment: 'product-spec',
        queryParams: { mpi: queryParams['mpi'] },
        relativeTo: this.route,
      });
    }
  }
}
