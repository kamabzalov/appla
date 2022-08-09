import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyViewedComponent {
  public faEye = faEye;
}
