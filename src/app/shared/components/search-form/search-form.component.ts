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

@Component({
  selector: 'appla-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  protected faSearch = iconSet.faMagnifyingGlass;
  protected searchQuery: SearchCategory | SearchProduct;
  protected resultsProducts$: Observable<any[]>;

  constructor(
    private router: Router,
    private restService: RestService,
    private route: ActivatedRoute
  ) {}

  public search() {
    this.router.navigate(['Search'], {
      relativeTo: this.route,
      queryParams: {
        string: this.searchQuery.name,
      },
    });
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
}
