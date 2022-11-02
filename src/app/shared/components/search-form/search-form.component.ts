import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'appla-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit {
  protected faSearch = iconSet.faMagnifyingGlass;
  protected searchQuery: SearchCategory | SearchProduct | string | null;
  protected resultsProducts$: Observable<any[]>;

  constructor(
    private router: Router,
    private restService: RestService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(_ => {
        // eslint-disable-next-line no-magic-numbers
        if (this.router.url.indexOf('Search') < 0) {
          this.searchQuery = '';
          this.cdr.markForCheck();
        }
      });
  }

  public search() {
    let query;
    if (typeof this.searchQuery === 'string') {
      query = this.searchQuery;
    } else {
      query = this.searchQuery?.name;
    }
    // eslint-disable-next-line no-magic-numbers
    if (query && query.length >= 3) {
      this.router.navigate(['Search'], {
        relativeTo: this.route,
        queryParams: {
          string: query,
        },
      });
    }
  }

  protected searchTypeAhead = (text$: Observable<string>) =>
    text$.pipe(
      // eslint-disable-next-line no-magic-numbers
      debounceTime(750),
      distinctUntilChanged(),
      filter((queryString: string) => !!queryString.length),
      switchMap(query => {
        const lang = this.languageService.currentAppLang$.getValue()!.id;
        this.resultsProducts$ = this.restService
          .searchProducts(lang, query)
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
    const lang = this.languageService.currentAppLang$.getValue()!.code;
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
