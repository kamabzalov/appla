import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-advertise-banner',
  templateUrl: './advertise-banner.component.html',
  styleUrls: ['./advertise-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiseBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
