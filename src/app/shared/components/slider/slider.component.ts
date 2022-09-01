import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Slide {
  banner_id: number;
  link: string;
  image: string;
  sod: Date;
  eod: Date;
  status: number;
  lang_id: number;
  page: string;
  position: number;
  click: string;
  type: string;
  keyword: string;
  date: Date;
}

@Component({
  selector: 'appla-slider',
  templateUrl: './slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input() public slides: Slide[];
}
