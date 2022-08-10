import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-aside-widget',
  templateUrl: './aside-widget.component.html',
  styleUrls: ['./aside-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideWidgetComponent {
  @Input() public widgetHeader: string;

  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;
  public isCollapsed = false;
}
