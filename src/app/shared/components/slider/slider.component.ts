import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {}
