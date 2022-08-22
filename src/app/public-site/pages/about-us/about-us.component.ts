import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {}
