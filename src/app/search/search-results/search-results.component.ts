import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';

export interface SearchResults {
  categories: SearchCategoryResult;
  products: SearchProduct[];
}

export interface SearchCategoryResult {
  count: number;
  data: SearchCategory[];
}

export interface SearchCategory {
  cat_name1: string;
  cat_name2: string;
  cat_name3: string;
  category_id: number;
  pic: string;
  picture: string;
  price_max: number;
  price_min: number;
  slug: string;
  _cnt: number;
}

export interface SearchProduct {
  cat_name1: string;
  cat_name2: string;
  cat_name3: string;
  manufacturer: string;
  master_product_id: string;
  name1: string;
  name2: string;
  name3: string;
  name_all_lower: string;
  not_used_words: string;
  picture: string;
  price_max: string;
  price_min: string;
  similarity_: string;
  sort_cat: string;
  str_tsquery: string;
  str_tsvector: string;
  str_tsvector_arr: string;
  _not_used_lexem: string;
  _used_lexem: string;
  _used_words: string;
}

@Component({
  selector: 'appla-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private restService: RestService
  ) {}

  public searchResults$: Observable<SearchResults>;

  public ngOnInit() {
    const searchString = this.activeRoute.snapshot.queryParams['string'];
    this.searchResults$ = this.restService.searchInShop(searchString);
  }
}
