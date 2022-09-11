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
}

interface ProductOfferCategory {
  category_id: number;
  parent_id: number;
  name1: string;
  name2: string;
  name3: string;
  picture: string;
  level: number;
  date_update: Date;
  user_update: number;
  status: number;
  slug: string;
  specification_data: any;
  search_field: any;
  product_variant: any;
  specification_data_ru: any;
  search_field_ru: any;
  specification_data_gr: any;
  search_field_gr: any;
  en_title: string;
  gr_title: string;
  ru_title: string;
  en_description: string;
  gr_description: string;
  ru_description: string;
}

interface ProductOfferInfo {
  master_product_id: number;
  category_id: number;
  sku: number;
  gtin: string;
  name1: string;
  name2: string;
  name3: string;
  long_description1: string;
  long_description2: string;
  long_description3: string;
  short_description1: string;
  short_description2: string;
  short_description3: string;
  weight: number;
  weight_unit: number;
  length: number;
  width: number;
  height: number;
  item_model_number: number;
  manufacturer: string;
  technical_detail: { [key: string]: any };
  date_update: Date;
  user_update: number;
  status: number;
  picture: string;
  price: number;
  type_id: number;
  store_id: number;
  position: string;
  en_title: string;
  gr_title: string;
  ru_title: string;
  en_description: string;
  gr_description: string;
  ru_description: string;
  en_product_title: string;
  gr_product_title: string;
  ru_product_title: string;
  en_product_description: string;
  gr_product_description: string;
  ru_product_description: string;
}

interface ProductOfferStores {
  product_price: number;
  raiting: number;
  ACSApiKey: string;
  ACSCompanyID: string;
  ACSCompanyPassword: number;
  ACSUserID: string;
  ACSUserPassword: number;
  Billing_Code: string;
  acs_station_id: string;
  active: number;
  address: string;
  avatar: string;
  banner: string;
  billingCode: string;
  changed_delivery: string;
  city: string;
  country: string;
  custom_order_fee: number;
  date_update: Date;
  delivery_method: number;
  description: string;
  employee: string;
  free_delivery: number;
  lang_preference: number;
  latitude: string;
  longitude: string;
  max_delivery: number;
  min_delivery: number;
  name: string;
  order_fee: number;
  phone: number;
  postal_code: number;
  product_slug: string;
  rule_preference: string;
  slug: string;
  state: string;
  status: number;
  store_id: number;
  user_frontend_id: number;
  user_update: number;
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
