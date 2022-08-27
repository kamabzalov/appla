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
  this_category: CurrentCategory;
  count_products: number;
}

export interface CategoryProduct {
  category_id: number;
  category_slug: string;
  count: number;
  count_products: number;
  date_update: Date;
  en_description: string;
  en_product_description: string;
  en_product_title: string;
  en_title: string;
  gr_description: string;
  gr_product_description: string;
  gr_product_title: string;
  gr_title: string;
  gtin: string;
  height: number;
  item_model_number: string;
  length: number;
  link: string;
  long_description1: string;
  long_description2: string;
  long_description3: string;
  manufacturer: string;
  master_product_id: number;
  max_price: number;
  min_price: number;
  name1: string;
  name2: string;
  name3: string;
  picture: string;
  position: string;
  price: string;
  product_ids: number;
  ru_description: string;
  ru_product_description: string;
  ru_product_title: string;
  ru_title: string;
  short_description1: string;
  short_description2: string;
  short_description3: string;
  sku: number;
  status: number;
  store_id: number;
  technical_detail: string;
  type_id: number;
  user_update: number;
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

export interface CurrentCategory {
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
  private readonly order = 'date_update_asc';

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit(): void {
    this.categoryIdSubscription = this.route.url.subscribe(res => {
      let slug = 'all-categories';
      if (res.length && res[1]) {
        slug = res[1].path;
      }
      this.getCategoryData(this.limit, this.offset, this.order, slug);
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
    slug: string
  ) {
    this.categoryData$ = this.restService.getAllCategories(
      limit,
      offset,
      order,
      slug
    );
  }
}
