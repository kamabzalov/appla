import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { iconSet } from '@app/shared/utils/icons';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

export interface Category {
  products: CategoryProduct[];
  subcategories: Subcategory[];
  this_category: CurrentCategory;
  filters: ProductFilter[];
  count_products: number;
}

export interface CategoryProduct {
  category_slug: string;
  count_all_products: number;
  count_products: number;
  master_product_id: number;
  max_price: number;
  min_price: number;
  name: string;
  picture: string;
  product_ids: number;
  updates: string;
  to_link: ToLink[];
}

export interface Subcategory {
  category_id: number;
  name: string;
  slug: string;
  specification_data: any[];
}

export interface CurrentCategory {
  name: string;
  slug: string;
}

export interface ProductFilter {
  filterKey: string;
  filterValue: { [key: number]: string };
}

interface ToLink {
  category_slug: string;
  product_slug: string;
  store_slug: string;
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
  protected faSearch = iconSet.faMagnifyingGlass;
  protected minPrice: number | null;
  protected maxPrice: number | null;
  protected searchInCategory: string;
  protected productFilters: ProductFilter[] = [];
  protected order: string = 'date_update_asc';
  protected sorting = SORTING;
  protected categoryData$: Observable<Category | null>;
  protected appLang: string;
  protected loading: boolean = false;
  // eslint-disable-next-line no-magic-numbers
  private offset = 0;
  // eslint-disable-next-line no-magic-numbers
  private readonly limit = 48;
  private slug = 'all-categories';
  private categoryIdSubscription: Subscription;
  private categorySubject$: BehaviorSubject<Category | null> =
    new BehaviorSubject<Category | null>(null);

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    private localizeRouterService: LocalizeRouterService
  ) {}

  public ngOnInit(): void {
    this.appLang = this.localizeRouterService.parser.currentLang;
    this.categoryData$ = this.categorySubject$.asObservable();
    this.categoryIdSubscription = this.route.url.subscribe(res => {
      if (res.length && res[1]) {
        this.slug = res[1].path;
      }
      this.offset = 0;
      this.minPrice = null;
      this.maxPrice = null;
      this.getCategoryData(this.limit, this.offset, this.order, this.slug);
    });
  }

  public ngOnDestroy() {
    if (this.categoryIdSubscription) {
      this.categoryIdSubscription.unsubscribe();
    }
    this.categorySubject$.next(null);
    this.categorySubject$.complete();
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

  protected handleFilter(filterKey: string, filterValue: string) {
    const isFound = this.productFilters.find(
      item => item.filterKey === filterKey
    );
    if (!isFound) {
      this.productFilters.push({ filterKey, filterValue });
    } else {
      // this.productFilters.splice(this.productFilters.indexOf(filterKey), 1);
    }
  }

  protected loadMoreProducts() {
    this.offset = this.offset + this.limit;
    this.loading = true;
    this.restService
      .getAllProductCategories(this.limit, this.offset, this.order, this.slug)
      .subscribe(res => {
        const currentCategories = this.categorySubject$.getValue();
        if (currentCategories) {
          currentCategories.products = currentCategories.products.concat(
            res.products
          );
          this.categorySubject$.next(currentCategories);
          this.loading = false;
        }
      });
  }

  private getCategoryData(
    limit: number,
    offset: number,
    order: string,
    slug: string,
    minPrice?: number | null,
    maxPrice?: number | null,
    searchQuery?: string
  ) {
    this.restService
      .getAllProductCategories(
        limit,
        offset,
        order,
        slug,
        minPrice,
        maxPrice,
        searchQuery
      )
      .subscribe(res => this.categorySubject$.next(res));
  }
}
