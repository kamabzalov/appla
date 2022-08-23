import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { faChevronRight, faTags } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable, Subscription } from 'rxjs';

export interface Category {
  products: CategoryProduct[];
  subcategories: Subcategory[];
}

export interface CategoryProduct {
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
}

export interface Subcategory {
  category_id: string;
  slug: string;
  name1: string;
  name2: string;
  name3: string;
}

@Component({
  selector: 'appla-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  public faChevronRight = faChevronRight;
  public faTags = faTags;

  public category$: Observable<Category>;
  public categoryIdSubscription = new Subscription();
  private categories$: Observable<Category[]>;

  constructor(
    private activeRouter: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit(): void {
    this.categoryIdSubscription = this.activeRouter.queryParams.subscribe(
      params => {
        const categoryId = params['category_id'];
        if (categoryId) {
          this.getCategoryProducts(categoryId);
        } else {
          this.getAllCategories();
        }
      }
    );
  }

  public ngOnDestroy() {
    if (this.categoryIdSubscription) {
      this.categoryIdSubscription.unsubscribe();
    }
  }

  private getCategoryProducts(categoryId: string) {
    this.category$ =
      this.restService.getCategoryProductsByCategoryId(categoryId);
  }

  private getAllCategories() {
    this.categories$ = this.restService.getAllCategories();
  }
}
