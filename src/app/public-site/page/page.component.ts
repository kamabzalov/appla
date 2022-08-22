import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {}
