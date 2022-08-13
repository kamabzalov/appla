import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faChevronRight, faTags } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';

export interface CategoryProduct {
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
  selector: 'appla-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent implements OnInit {
  public faChevronRight = faChevronRight;
  public faTags = faTags;

  public category$: Observable<CategoryProduct[]>;

  constructor(
    private activeRouter: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit(): void {
    const categoryId = this.activeRouter.snapshot.queryParams['category_id'];
    if (categoryId) {
      this.getCategoryProducts(categoryId);
    }
  }

  private getCategoryProducts(categoryId: string) {
    this.category$ =
      this.restService.getCategoryProductsByCategoryId(categoryId);
  }
}
