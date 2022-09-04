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
  filters: ProductFilter[];
  count_products: number;
}

export interface CategoryProduct {
  updates: string;
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
  technical_detail: string;
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
  category_slug: string;
  count_products: number;
  min_price: number;
  max_price: number;
  product_ids: number;
  count_all_products: number;
  to_link: ToLink[];
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

export interface ProductFilter {
  filterKey: string;
  filterValue: { [key: number]: string };
}

interface ToLink {
  store_slug: string;
  product_slug: string;
  category_slug: string;
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
  protected productFilters: ProductFilter[] = [];
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

  protected searchProductInCategory() {
    this.getCategoryData(
      this.limit,
      this.offset,
      this.order,
      this.slug,
      this.minPrice,
      this.maxPrice,
      this.searchInCategory
    );
  }

  protected sortProductsBy() {
    this.getCategoryData(this.limit, this.offset, this.order, this.slug);
  }

  protected handleFilter(filter: ProductFilter) {
    this.productFilters.push(filter);
  }

  protected loadMoreProducts() {
    this.offset = this.offset + this.limit;
    this.getCategoryData(this.limit, this.offset, this.order, this.slug);
  }

  private getCategoryData(
    limit: number,
    offset: number,
    order: string,
    slug: string,
    minPrice?: number,
    maxPrice?: number,
    searchQuery?: string
  ) {
    this.categoryData$ = this.restService.getAllCategories(
      limit,
      offset,
      order,
      slug,
      minPrice,
      maxPrice,
      searchQuery
    );
  }
}
