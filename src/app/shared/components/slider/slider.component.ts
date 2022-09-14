import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Slide {
  banner_id: number;
  click: string;
  date: Date;
  eod: Date;
  image: string;
  keyword: string;
  lang_id: number;
  link: string;
  page: string;
  position: number;
  sod: Date;
  status: number;
  type: string;
}

@Component({
  selector: 'appla-slider',
  templateUrl: './slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input() public slides: Slide[];
}
