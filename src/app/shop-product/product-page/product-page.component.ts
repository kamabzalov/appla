import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faPlus, faMinus, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';

export interface Product {
  category_id: string;
  comment: string;
  condition: string;
  created_date: Date;
  date_update: Date;
  delivery_service: string;
  discount: string;
  gtin: string;
  height: string;
  item_model_number: string;
  length: string;
  long_description1: string;
  long_description2: string;
  long_description3: string;
  manufacturer: string;
  master_product_id: string;
  min_order: string;
  name1: string;
  name2: string;
  name3: string;
  order_fee: string;
  original_price: string;
  picture: string;
  price: string;
  product_id: string;
  product_variant: string;
  qty: string;
  refund_days: string;
  refund_status: string;
  shipping_insurance: string;
  short_description1: string;
  short_description2: string;
  short_description3: string;
  showcase: string;
  sku: string;
  slug: string;
  status: string;
  store_id: string;
  technical_detail: string;
  user_update: string;
  vat: string;
  weight: string;
  weight_unit: string;
  width: string;
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

  constructor(
    private activeRoute: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit(): void {
    const productId = this.activeRoute.snapshot.queryParams['product_id'];
    if (productId) {
      this.product$ = this.restService.getProductById(productId);
    }
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
