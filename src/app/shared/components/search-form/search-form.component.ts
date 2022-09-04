import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from 'rxjs';
import { RestService } from '@app/services/rest/rest.service';
import { iconSet } from '@app/shared/utils/icons';
import { SearchProduct } from '@app/search/search-results/search-results.component';

@Component({
  selector: 'appla-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  protected faSearch = iconSet.faMagnifyingGlass;
  protected searchQuery: any;
  protected resultsProducts$: Observable<SearchProduct[]>;

  constructor(private router: Router, private restService: RestService) {}

  public search() {
    this.router.navigate(['Search'], {
      queryParams: {
        string:
          typeof this.searchQuery === 'string'
            ? this.searchQuery
            : this.searchQuery.name1,
      },
    });
  }

  protected searchTypeAhead = (text$: Observable<string>) =>
    text$.pipe(
      // eslint-disable-next-line no-magic-numbers
      debounceTime(750),
      distinctUntilChanged(),
      switchMap(query => {
        this.resultsProducts$ = this.restService.searchProducts(query);
        return this.resultsProducts$;
      })
    );

  protected formatter(result: SearchProduct): string {
    return result.name1;
  }
}
