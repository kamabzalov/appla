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
  arr_cats: Breadcrumb[];
  category: ProductOfferCategory;
  master_product_info: ProductOfferInfo;
  rating: number;
  stories: ProductOfferStores[];
  similar_short: ProductOfferSimilar[];
}

interface Breadcrumb {
  cat_id: number;
  name: string;
  parent_id: number;
  slug: string;
}

interface ProductOfferCategory {
  category_id: number;
  level: number;
  name: string;
  parent_id: number;
  picture: string;
  product_variant: string[];
  search_field: string[];
  slug: string;
}

interface ProductOfferInfo {
  technical_detail: { [key: string]: any };
  category_id: number;
  height: number;
  item_model_number: number;
  length: number;
  long_description: string;
  manufacturer: string;
  master_product_id: number;
  min_price: number;
  name: string;
  picture: string;
  short_description: string;
  weight: number;
  weight_unit: number;
  width: number;
}

interface ProductOfferStores {
  active: number;
  avatar: string;
  delivery_method: number;
  description: string;
  free_delivery: number;
  max_delivery: number;
  min_delivery: number;
  name: string;
  price: number;
  product_id: number;
  product_slug: string;
  raiting: number;
  store_id: number;
  store_slug: string;
  user_frontend_id: number;
}

export interface ProductOfferSimilar {
  category_id: number;
  discount: number;
  name: string;
  picture: string;
  price: number;
  product_id: number;
  product_slug: string;
  qty: number;
  stars: number;
  store_id: number;
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
