import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  SearchCategory,
  SearchProduct,
} from '@app/search/search-results/search-results.component';

@Component({
  selector: 'appla-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultCardComponent {
  @Input() public category: SearchCategory;
  @Input() public product: SearchProduct;
}
