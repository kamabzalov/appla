import { ChangeDetectionStrategy, Component } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public faStar: IconDefinition = iconSet.faStar;
  public faEye: IconDefinition = iconSet.faEye;
}
