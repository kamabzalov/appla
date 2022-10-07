import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface SearchResults {
  categories: SearchCategoryResult;
  products: SearchProduct[];
}

export interface SearchCategoryResult {
  count: number;
  data: SearchCategory[];
}

export interface SearchCategory {
  category_id: number;
  name: string;
  pic: string;
  picture: string;
  price_max: number;
  price_min: number;
  slug: string;
  _cnt: number;
}

export interface SearchProduct {
  cat_name: string;
  manufacturer: string;
  master_product_id: number;
  name: string;
  name_all_lower: string;
  not_used_words: string;
  picture: string;
  price_max: number;
  price_min: number;
  similarity_: number;
  sort_cat: string;
  str_tsquery: string;
  str_tsvector: string;
  str_tsvector_arr: string;
  _not_used_lexem: string;
  _used_lexem: string;
  _used_words: string;
}

export interface Slugs {
  category_slug: string;
  product_slug: string;
  store_slug: string;
}

@UntilDestroy()
@Component({
  selector: 'appla-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
  public searchResults$: Observable<SearchResults | null>;
  protected loading: boolean = false;
  protected query: string;
  protected category: string;
  protected isHide: boolean = false;
  // eslint-disable-next-line no-magic-numbers
  private limit: number = 12;
  // eslint-disable-next-line no-magic-numbers
  private offset: number = 0;
  private currentSearchState$: BehaviorSubject<SearchResults | null> =
    new BehaviorSubject<SearchResults | null>(null);

  constructor(
    private activeRoute: ActivatedRoute,
    private restService: RestService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.query = this.activeRoute.snapshot.queryParams['string'];
    this.activeRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe(
        params =>
          (this.searchResults$ = this.restService
            .searchInShop(params['string'])
            .pipe(tap(res => this.currentSearchState$.next(res))))
      );
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((res: any) => {
        this.query = res.urlAfterRedirects.split('?string=')[1];
        this.searchResults$ = this.restService
          .searchInShop(this.query)
          .pipe(tap(res => this.currentSearchState$.next(res)));
      });
  }

  public searchInCategory($event: string) {
    this.isHide = false;
    this.category = $event;
    this.offset = 0;
    this.limit = 12;
    const currentSearchState = this.currentSearchState$.getValue();
    if (currentSearchState) {
      this.currentSearchState$.next({
        categories: currentSearchState?.categories,
        products: [],
      });
    }
    this.searchResults$ = this.restService
      .searchInShop(this.query, this.limit, this.offset, this.category)
      .pipe(tap(res => this.currentSearchState$.next(res)));
  }

  protected loadMoreProducts() {
    this.offset = this.offset + this.limit;
    this.loading = true;
    this.searchResults$ = this.restService
      .searchInShop(this.query, this.limit, this.offset, this.category)
      .pipe(
        map(res => {
          this.loading = false;
          const currentSearchState = this.currentSearchState$.getValue();
          if (!res.products.length) {
            this.isHide = true;
            this.currentSearchState$.next(currentSearchState);
            return currentSearchState;
          }
          if (currentSearchState) {
            if (this.category) {
              const categoryState = {
                categories: currentSearchState.categories,
                products: currentSearchState.products.concat(res.products),
              };
              this.currentSearchState$.next(categoryState);
              return categoryState;
            } else {
              currentSearchState.products = currentSearchState.products.concat(
                res.products
              );
              this.currentSearchState$.next(currentSearchState);
              return currentSearchState;
            }
          }
          return res;
        })
      );
  }
}
