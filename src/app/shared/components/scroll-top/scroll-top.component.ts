import { ChangeDetectionStrategy, Component } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';

@Component({
  selector: 'appla-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollTopComponent {
  protected faChevronUp = iconSet.faChevronUp;

  protected scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
