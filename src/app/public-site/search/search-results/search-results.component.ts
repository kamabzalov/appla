import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { filter, Observable, Subscription } from 'rxjs';

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

@Component({
  selector: 'appla-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
  public searchResults$: Observable<SearchResults>;
  // eslint-disable-next-line no-magic-numbers
  private limit: number = 24;
  // eslint-disable-next-line no-magic-numbers
  private offset: number = 0;
  private query: string;
  private categoryIdSubscription: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private restService: RestService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.query = this.activeRoute.snapshot.queryParams['string'];
    this.activeRoute.queryParams.subscribe(
      params =>
        (this.searchResults$ = this.restService.searchInShop(params['string']))
    );
    this.categoryIdSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(
        _ => (this.searchResults$ = this.restService.searchInShop(this.query))
      );
  }

  protected loadMoreProducts() {
    this.offset = this.offset + this.limit;
    this.restService
      .searchInShop(this.query, this.limit, this.offset)
      .subscribe(res => console.log(res));
  }
}
