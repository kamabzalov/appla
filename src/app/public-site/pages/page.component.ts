import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {}
