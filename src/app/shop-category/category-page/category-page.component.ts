import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable, Subscription } from 'rxjs';
import { iconSet } from '@app/shared/utils/icons';

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

const SORTING = [
  {
    id: 'date_update_asc',
    name: 'Newest',
  },
  {
    id: 'price_asc',
    name: 'Price: Low to High',
  },
  {
    id: 'price_desc',
    name: 'Price: High to Low',
  },
];

@Component({
  selector: 'appla-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  protected faChevronRight = iconSet.faChevronRight;
  protected faTags = iconSet.faTags;
  protected faMagnifyingGlass = iconSet.faMagnifyingGlass;
  protected minPrice: number;
  protected maxPrice: number;
  protected searchInCategory: string;
  protected order: string = 'date_update_asc';
  protected sorting = SORTING;
  protected categoryData$: Observable<Category>;

  // eslint-disable-next-line no-magic-numbers
  private offset = 0;
  // eslint-disable-next-line no-magic-numbers
  private readonly limit = 48;
  private slug = 'all-categories';
  private categoryIdSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit(): void {
    this.categoryIdSubscription = this.route.url.subscribe(res => {
      if (res.length && res[1]) {
        this.slug = res[1].path;
      }
      this.getCategoryData(this.limit, this.offset, this.order, this.slug);
    });
  }

  public ngOnDestroy() {
    if (this.categoryIdSubscription) {
      this.categoryIdSubscription.unsubscribe();
    }
  }

  protected filterByPrice() {
    this.getCategoryData(
      this.limit,
      this.offset,
      this.order,
      this.slug,
      this.minPrice,
      this.maxPrice
    );
  }

  protected searchProductInCategory() {}

  protected sortProductsBy() {
    this.getCategoryData(this.limit, this.offset, this.order, this.slug);
  }

  private getCategoryData(
    limit: number,
    offset: number,
    order: string,
    slug: string,
    minPrice?: number,
    maxPrice?: number
  ) {
    this.categoryData$ = this.restService.getAllCategories(
      limit,
      offset,
      order,
      slug,
      minPrice,
      maxPrice
    );
  }
}
