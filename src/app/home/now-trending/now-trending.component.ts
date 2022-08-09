import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-now-trending',
  templateUrl: './now-trending.component.html',
  styleUrls: ['./now-trending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowTrendingComponent {
  public faStar = faStar;
}
