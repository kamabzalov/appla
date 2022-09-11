import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable, Subscription, tap } from 'rxjs';

export interface Product {
  store_name: string;
  store_avatar: string;
  title: string;
  description: string;
  page: string;
  cart: any[];
  product: ProductDetails;
  product_variant: any[];
  arr_cats: ProductCategory[];
  category_slug: string;
  fav_store: number;
  wish: number;
  store: StoreData;
  user_store: UserStore;
  feedbacks: any[];
  feedbacks_count: number;
  sold: number;
  product_star: number;
  seller_rating: number;
  seller_feedback: number;
  additional_header: string;
  similar_short: SimilarProduct[];
  name: string;
  technical_detail: { [key: string]: any };
  product_detail: boolean;
  canonical_link: CanonicalData;
  user: string;
}

export interface SimilarProduct {
  product_id: number;
  sku: number;
  name1: string;
  name2: string;
  name3: string;
  price: number;
  discount: number;
  long_description1: number;
  long_description2: number;
  long_description3: number;
  qty: number;
  date_update: number;
  user_update: number;
  status: number;
  store_id: number;
  category_id: number;
  picture: string[];
  short_description1: string;
  short_description2: string;
  short_description3: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  showcase: string;
  condition: number;
  min_order: number;
  shipping_insurance: number;
  delivery_service: number;
  weight_unit: number;
  slug: string;
  technical_detail: any;
  item_model_number: string;
  manufacturer: string;
  original_price: number;
  vat: number;
  order_fee: number;
  master_product_id: number;
  refund_status: number;
  refund_days: number;
  comment: number;
  product_variant: string;
  gtin: number;
  created_date: Date;
  star: number;
  store_slug: number;
}

interface ProductDetails {
  product_id: number;
  sku: number;
  name1: string;
  name2: string;
  name3: string;
  price: number;
  discount: number;
  long_description1: string;
  long_description2: string;
  long_description3: string;
  qty: number;
  date_update: string;
  user_update: string;
  status: number;
  store_id: number;
  category_id: number;
  picture: string[];
  short_description1: string;
  short_description2: string;
  short_description3: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  showcase: string;
  condition: number;
  min_order: number;
  shipping_insurance: number;
  delivery_service: number;
  weight_unit: number;
  slug: string;
  technical_detail: string;
  item_model_number: string;
  manufacturer: string;
  original_price: number;
  vat: number;
  order_fee: number;
  master_product_id: number;
  refund_status: number;
  refund_days: number;
  comment: string;
  product_variant: string;
  gtin: string;
  created_date: string;
  category_name: string;
  category_name2: string;
  category_name3: string;
  store_name: string;
  store_slug: string;
  state: string;
  store_avatar: string;
  store_city: number;
}

interface ProductCategory {
  cat_id: number;
  name1: string;
  name2: string;
  name3: string;
  slug: string;
}

interface StoreData {
  store_id: number;
  name: string;
  address: string;
  postal_code: number;
  phone: number;
  longitude: number;
  latitude: number;
  active: number;
  date_update: Date;
  user_update: number;
  status: number;
  user_frontend_id: number;
  avatar: string;
  city: number;
  state: string;
  slug: number;
  order_fee: number;
  country: string;
  acs_station_id: string;
  ACSApiKey: string;
  billingCode: number;
  ACSCompanyID: string;
  ACSCompanyPassword: number;
  ACSUserID: number;
  ACSUserPassword: number;
  Billing_Code: string;
  employee: string;
  lang_preference: number;
  custom_order_fee: number;
  delivery_method: number;
  min_delivery: number;
  max_delivery: number;
  free_delivery: number;
  banner: string;
  description: string;
  changed_delivery: number;
  rule_preference: string;
}

interface UserStore {
  user_frontend_id: number;
  avatar: string;
  unique_code: string;
  name: string;
  gender: string;
  address: string;
  email: string;
  password: string;
  phone: string;
  birth: string;
  point_reward: number;
  device_id: number;
  active: number;
  date_update: Date;
  user_update: Date;
  status: number;
  login_type: string;
  uuid: number;
  language_id: number;
  appla_cash: number;
  account_number: number;
  bank_name: string;
  account_name: string;
  created_at: Date;
  account_beneficiary: string;
  language_preference: number;
}

interface CanonicalData {
  rel: string;
  href: string;
}

@Component({
  selector: 'appla-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  public faPlus = faPlus;
  public faMinus = faMinus;
  public faStar = faStar;
  // eslint-disable-next-line no-magic-numbers
  public productQuantity: number = 1;

  public product$: Observable<Product>;
  public productSlugSubscription: Subscription;
  protected mainPage: string;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit(): void {
    this.productSlugSubscription = this.route.url.subscribe(res => {
      const storeSlug = res[0].path;
      const productSlug = res[1].path;
      if (storeSlug && productSlug) {
        this.product$ = this.restService
          .getProductBySlug(storeSlug, productSlug)
          .pipe(
            tap(res => {
              this.mainPage = res.product.picture[0];
            })
          );
      }
    });
  }

  protected decreaseQuantity() {
    // eslint-disable-next-line no-magic-numbers
    if (this.productQuantity === 1) {
      return;
    }
    this.productQuantity--;
  }

  protected increaseQuantity() {
    this.productQuantity++;
  }

  protected setMax(qty: number) {
    this.productQuantity = qty;
  }

  protected setActive($event: string) {
    this.mainPage = $event;
  }
}
