/* eslint-disable no-magic-numbers */
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser } from '@angular/common';

// TODO: move to common util
enum Breakpoints {
  SMALL = 576,
  MEDIUM = 768,
  LARGE = 992,
  XLARGE = 1200,
}

// TODO: move to common util
function _window(): any {
  return window;
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

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isCollapsed = this.checkCollapseState();
  }

  @HostListener('window:resize', ['$event'])
  public checkSize() {
    if (this.collapseInMobile) {
      if (isPlatformBrowser(this.platformId)) {
        this.isCollapsed = this.checkCollapseState();
      }
    }
  }

  private checkCollapseState(): boolean {
    return _window().innerWidth <= Breakpoints.MEDIUM;
  }
}
