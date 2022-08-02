import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-compare-prices',
  templateUrl: './compare-prices.component.html',
  styleUrls: ['./compare-prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparePricesComponent{

  faTruck = faTruck;

}
