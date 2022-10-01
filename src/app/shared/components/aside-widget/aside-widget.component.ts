/* eslint-disable no-magic-numbers */
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Input,
} from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

enum Breakpoints {
  SMALL = 576,
  MEDIUM = 768,
  LARGE = 992,
  XLARGE = 1200,
}

@Component({
  selector: 'appla-aside-widget',
  templateUrl: './aside-widget.component.html',
  styleUrls: ['./aside-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideWidgetComponent {
  @Input() public widgetHeader: string;
  @Input() public collapseInMobile: boolean;
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;
  public isCollapsed = false;

  constructor(@Inject('Window') private window: Window) {}

  @HostListener('window:resize', ['$event'])
  public checkSize() {
    if (this.collapseInMobile) {
      this.isCollapsed = this.window.innerWidth <= Breakpoints.MEDIUM;
    }
  }
}
