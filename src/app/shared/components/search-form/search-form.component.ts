import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'appla-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  public faSearch = faMagnifyingGlass;
  public searchQuery: string;

  constructor(private router: Router) {}

  public search() {
    this.router.navigate(['Search'], {
      queryParams: { string: this.searchQuery },
    });
  }
}
