import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
} from 'rxjs';
import { RestService } from '@app/services/rest/rest.service';

@Component({
  selector: 'appla-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  public faSearch = faMagnifyingGlass;
  public searchQuery: string;

  constructor(private router: Router, private restService: RestService) {}

  public search() {
    this.router.navigate(['Search'], {
      queryParams: { string: this.searchQuery },
    });
  }

  protected searchTypeAhead: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      // eslint-disable-next-line no-magic-numbers
      debounceTime(200),
      distinctUntilChanged(),
      map(query => [query])
    );
}
