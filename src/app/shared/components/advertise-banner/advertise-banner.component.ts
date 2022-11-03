import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'appla-advertise-banner',
  templateUrl: './advertise-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiseBannerComponent implements OnInit {
  protected res: string;
  protected url: string = 'https://angular.io/api/router/RouterLink';
  protected urlSafe: SafeResourceUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );

    this.http
      .post<any>('https://advertisement.appla.cy/ser.php?t=AADIV&f=37', null, {
        responseType: 'text' as 'json',
      })
      .subscribe(res => {
        // this.insertScript(res);
        // this.res = '<script>' + res + '</script>';
        this.cdr.markForCheck();
      });
  }

  private insertScript(res: string) {
    const scr: HTMLScriptElement = this.document.createElement('script');
    scr.type = 'text/javascript';
    scr.src = res;
    this.document.head.appendChild(this.document.body);
  }
}
