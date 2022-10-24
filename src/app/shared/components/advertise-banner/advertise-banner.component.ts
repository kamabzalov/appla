import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'appla-advertise-banner',
  templateUrl: './advertise-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiseBannerComponent {
  constructor(private http: HttpClient) {
    let k = decodeURIComponent(document.cookie),
      ca = k.split(';'),
      psc = '';
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf('adcapban') === 0)
        psc +=
          (psc == '' ? '' : ',') + c.replace('adcapban', '').replace('=', ',');
    }
    this.http
      .get<any>(
        'https://advertisement.appla.cy/ser.php?t=AADIV' +
          String.fromCharCode(38) +
          'f=' +
          String.fromCharCode(38) +
          'psc=' +
          psc,
        { withCredentials: true }
      )
      .subscribe();
  }
}
