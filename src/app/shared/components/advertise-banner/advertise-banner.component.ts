import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'appla-advertise-banner',
  templateUrl: './advertise-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiseBannerComponent implements OnInit {
  protected res: SafeHtml;
  protected url: string = 'https://angular.io/api/router/RouterLink';
  protected urlSafe: SafeResourceUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  public ngOnInit(): void {
    const script = this._renderer2.createElement('script');
    script.src = 'https://advertisement.appla.cy/ser.php?t=AADIV&f=37';

    this._renderer2.appendChild(this._document.body, script);
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    // this.http
    //   .post<any>('https://advertisement.appla.cy/ser.php?t=AADIV&f=37', null, {
    //     responseType: 'text' as 'json',
    //   })
    //   .subscribe(res => {
    //     this.res = this.sanitizer.bypassSecurityTrustHtml(
    //       '<script>' + res + '</script>'
    //     );
    //     this.cdr.markForCheck();
    //   });
  }

  // private insertScript(res: string) {
  //   const scr: HTMLScriptElement = this.document.createElement('script');
  //   scr.type = 'text/javascript';
  //   scr.src = res;
  //   this.document.head.appendChild(this.document.body);
  // }
}
