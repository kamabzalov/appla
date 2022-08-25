import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable, Subscription } from 'rxjs';

export interface Product {
  product_id: string;
  sku: string;
  name1: string;
  name2: string;
  name3: string;
  price: string;
  discount: string;
  long_description1: string;
  long_description2: string;
  long_description3: string;
  qty: string;
  date_update: Date;
  user_update: string;
  status: string;
  store_id: string;
  category_id: string;
  picture: string;
  short_description1: string;
  short_description2: string;
  short_description3: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  showcase: string;
  condition: string;
  min_order: string;
  shipping_insurance: string;
  delivery_service: string;
  weight_unit: string;
  slug: string;
  technical_detail: string;
  item_model_number: string;
  manufacturer: string;
  original_price: string;
  vat: string;
  order_fee: string;
  master_product_id: string;
  refund_status: string;
  refund_days: string;
  comment: string;
  product_variant: string;
  gtin: string;
  created_date: Date;
  category_name1: string;
  category_name2: string;
  category_name3: string;
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
  public productQuantity: number = 1;

  public product$: Observable<Product>;
  public productSlugSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit(): void {
    this.productSlugSubscription = this.route.url.subscribe(res => {
      const slug = res[1].path;
      if (slug) {
        this.product$ = this.restService.getProductBySlug(slug);
      }
    });
  }

  public decreaseQuantity() {
    if (this.productQuantity === 1) {
      return;
    }
    this.productQuantity--;
  }

  public increaseQuantity() {
    this.productQuantity++;
  }
}
