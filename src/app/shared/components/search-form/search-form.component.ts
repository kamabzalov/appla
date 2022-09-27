import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { RestService } from '@app/services/rest/rest.service';
import { iconSet } from '@app/shared/utils/icons';
import {
  SearchCategory,
  SearchProduct,
} from '@app/public-site/search/search-results/search-results.component';
import { LanguageService } from '@app/services/language/language.service';

@Component({
  selector: 'appla-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  protected faSearch = iconSet.faMagnifyingGlass;
  protected searchQuery: SearchCategory | SearchProduct | string | null;
  protected resultsProducts$: Observable<any[]>;

  constructor(
    private router: Router,
    private restService: RestService,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  public search() {
    let query;
    if (typeof this.searchQuery === 'string') {
      query = this.searchQuery;
    } else {
      query = this.searchQuery?.name;
    }
    this.router.navigate(['Search'], {
      relativeTo: this.route,
      queryParams: {
        string: query,
      },
    });
    this.searchQuery = '';
  }

  protected searchTypeAhead = (text$: Observable<string>) =>
    text$.pipe(
      // eslint-disable-next-line no-magic-numbers
      debounceTime(750),
      distinctUntilChanged(),
      switchMap(query => {
        this.resultsProducts$ = this.restService
          .searchProducts(query)
          .pipe(
            map(results => [...results.categories.data, ...results.products])
          );
        return this.resultsProducts$;
      })
    );

  protected formatter(result: SearchProduct | SearchCategory): string {
    return result.name;
  }

  protected getClassName(r: SearchProduct | SearchCategory): boolean {
    return !('master_product_id' in r);
  }

  protected goToEntity(r: SearchProduct | SearchCategory) {
    const lang = this.languageService.currentAppLang$.getValue().code;
    if ('master_product_id' in r) {
      this.restService
        .getProductByMasterId(r.master_product_id)
        .subscribe(res => {
          const slugs = res[0];
          this.router.navigate([
            `/${lang}/product/${slugs.store_slug}/${slugs.product_slug}`,
          ]);
        });
    } else {
      this.router.navigate([`/${lang}/category/list/${r.slug}`]);
    }
  }
}
