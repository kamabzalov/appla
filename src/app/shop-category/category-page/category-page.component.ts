import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { faChevronRight, faTags } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable, Subscription } from 'rxjs';
import { getIdFromSlug } from '@app/shared/utils/functions';

export interface Category {
  products: CategoryProduct[];
  subcategories: Subcategory[];
  count_products: number;
}

export interface CategoryProduct {
  category_id: number;
  comment: string;
  condition: number;
  created_date: Date;
  date_update: Date;
  delivery_service: number;
  discount: number;
  gtin: string;
  height: number;
  item_model_number: string;
  length: number;
  long_description1: string;
  long_description2: string;
  long_description3: string;
  manufacturer: string;
  master_product_id: number;
  min_order: number;
  name1: string;
  name2: string;
  name3: string;
  order_fee: number;
  original_price: number;
  picture: string;
  price: number;
  product_id: number;
  product_variant: string;
  qty: number;
  refund_days: number;
  refund_status: number;
  shipping_insurance: number;
  short_description1: string;
  short_description2: string;
  short_description3: string;
  showcase: number;
  sku: string;
  slug: string;
  status: number;
  store_id: number;
  store_slug: string;
  technical_detail: string;
  user_update: string;
  vat: number;
  weight: number;
  weight_unit: number;
  width: number;
}

export interface Subcategory {
  category_id: number;
  name1: string;
  name2: string;
  name3: string;
  slug: string;
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

  public categoryData$: Observable<Category>;
  public categoryIdSubscription = new Subscription();

  private offset = 0;

  private readonly limit = 48;
  private readonly order = 'date';

  constructor(private router: Router, private restService: RestService) {}

  public ngOnInit(): void {
    this.categoryIdSubscription = this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        const categoryId = getIdFromSlug(route.urlAfterRedirects);
        if (categoryId) {
          this.getCategoryData(this.limit, this.offset, this.order, categoryId);
        } else {
          this.getCategoryData(
            this.limit,
            this.offset,
            this.order,
            'all-categories'
          );
        }
      }
    });
  }

  public ngOnDestroy() {
    if (this.categoryIdSubscription) {
      this.categoryIdSubscription.unsubscribe();
    }
  }

  private getCategoryData(
    limit: number,
    offset: number,
    order: string,
    slug: string | number
  ) {
    this.categoryData$ = this.restService.getAllCategories(
      limit,
      offset,
      order,
      slug
    );
  }
}
