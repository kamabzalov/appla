import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {}
