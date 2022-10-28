import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { iconSet } from '@app/shared/utils/icons';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LanguageService } from '@app/services/language/language.service';
import { SeoService } from '@app/services/seo/seo.service';

export interface Category {
  arr_cats: CategoryBreadcrumb[];
  this_category: CurrentCategory;
  subcategories: Subcategory[];
}

export interface CategoryProducts {
  products: CategoryProduct[];
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
  filters: { [key: string]: any };
}

interface ToLink {
  category_slug: string;
  product_slug: string;
  store_slug: string;
}

interface CategoryBreadcrumb {
  cat_id: number;
  name: string;
  parent_id: number;
  slug: string;
}

@UntilDestroy()
@Component({
  selector: 'appla-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent implements OnInit {
  protected faChevronRight = iconSet.faChevronRight;
  protected faTags = iconSet.faTags;
  protected faSearch = iconSet.faMagnifyingGlass;
  protected minPrice: number | null;
  protected maxPrice: number | null;
  protected searchInCategory: string;
  protected productFilters: any[] = [];
  protected order: string = 'default';
  protected categoryData$: Observable<Category | null>;
  protected categoryProducts$: Observable<CategoryProducts | null>;
  protected filters$: Observable<ProductFilter | null>;
  protected loading: boolean = false;
  protected appLang: string;
  // eslint-disable-next-line no-magic-numbers
  private offset = 0;
  // eslint-disable-next-line no-magic-numbers
  private readonly limit = 48;
  private slug = 'all-categories';
  private categoryProductsSubject$: BehaviorSubject<CategoryProducts | null> =
    new BehaviorSubject<CategoryProducts | null>(null);

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    private localizeRouterService: LocalizeRouterService,
    private languageService: LanguageService,
    private seoService: SeoService
  ) {}

  public ngOnInit(): void {
    this.appLang = this.localizeRouterService.parser.currentLang;
    this.categoryProducts$ = this.categoryProductsSubject$
      .asObservable()
      .pipe(untilDestroyed(this));
    this.route.url.pipe(untilDestroyed(this)).subscribe(res => {
      if (res.length && res[1]) {
        this.slug = res[1].path;
        this.order = 'default';
        this.searchInCategory = '';
      }
      this.offset = 0;
      this.minPrice = null;
      this.maxPrice = null;
      this.languageService.currentAppLang$.subscribe(_ => {
        this.categoryData$ = this.restService.getCategory(this.slug);
        this.getCategoryProducts(
          this.limit,
          this.offset,
          this.order,
          this.slug
        );
        this.getProductFilters(this.slug);
        this.getCategorySeo(this.slug);
      });
    });
  }

  protected filterByPrice() {
    this.getCategoryProducts(
      this.limit,
      this.offset,
      this.order,
      this.slug,
      this.minPrice,
      this.maxPrice
    );
  }

  protected searchProductInCategory() {
    this.getCategoryProducts(
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
    this.getCategoryProducts(
      this.limit,
      this.offset,
      this.order,
      this.slug,
      this.minPrice,
      this.maxPrice
    );
  }

  protected handleFilter(
    $event: Event,
    filterKey: string,
    filterValue: unknown
  ) {
    const checkedFilter = ($event.target as HTMLInputElement).checked;
    const filter = { filterKey, filterValue: [filterValue] };

    if (checkedFilter) {
      this.productFilters.push(filter);
    } else {
      // eslint-disable-next-line no-magic-numbers
      this.productFilters.splice(this.productFilters.indexOf(filter), 1);
    }
    this.getCategoryProducts(
      this.limit,
      this.offset,
      this.order,
      this.slug,
      this.minPrice,
      this.maxPrice,
      this.searchInCategory,
      this.productFilters
    );
  }

  protected loadMoreProducts() {
    this.offset = this.offset + this.limit;
    this.loading = true;
    this.restService
      .getAllProductCategories(
        this.limit,
        this.offset,
        this.order,
        this.slug,
        this.minPrice,
        this.maxPrice
      )
      .subscribe(res => {
        const currentCategories = this.categoryProductsSubject$.getValue();
        if (currentCategories) {
          currentCategories.products = currentCategories.products.concat(
            res.products
          );
          this.categoryProductsSubject$.next(currentCategories);
          this.loading = false;
        }
      });
  }

  private getCategoryProducts(
    limit: number,
    offset: number,
    order: string,
    slug: string,
    minPrice?: number | null,
    maxPrice?: number | null,
    searchQuery?: string,
    filters?: any[]
  ) {
    this.restService
      .getAllProductCategories(
        limit,
        offset,
        order,
        slug,
        minPrice,
        maxPrice,
        searchQuery,
        filters
      )
      .subscribe(res => this.categoryProductsSubject$.next(res));
  }

  private getProductFilters(slug: string) {
    this.filters$ = this.restService.getProductFilters(slug);
  }

  private getCategorySeo(slug: string) {
    this.restService.getCategorySeo(slug).subscribe(res => {
      this.seoService.setTitle(res?.title);
      this.seoService.setMeta('description', res?.description);
    });
  }
}
