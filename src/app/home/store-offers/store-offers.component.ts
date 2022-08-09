import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-store-offers',
  templateUrl: './store-offers.component.html',
  styleUrls: ['./store-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOffersComponent {
  public faStar = faStar;
}
