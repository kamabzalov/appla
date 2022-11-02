import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { BackendResponse, RestService } from '@app/services/rest/rest.service';
import { Router } from '@angular/router';
import { iconSet } from '@app/shared/utils/icons';

@Component({
  selector: 'appla-login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  protected appLang: string;
  protected showError: boolean;
  protected email: string;
  protected password: string;

  protected faFacebook = iconSet.faFacebook;
  protected faGoogle = iconSet.faGoogle;

  constructor(
    private localizeRouterService: LocalizeRouterService,
    private restService: RestService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.appLang = this.localizeRouterService.parser.currentLang;
  }

  protected login() {
    this.restService.login(this.email, this.password).subscribe(result => {
      this.showError = result.status === 'failed';
      if (result.status === 'success') {
        this.router.navigate([`${this.appLang}`]);
      }
    });
  }

  protected signWithGoogle() {
    this.restService.signWithGoogle().then(res => {
      this.restService
        .doGoogle(res?.additionalUserInfo?.profile)
        .subscribe((response: BackendResponse) => {
          if (response.status === 'success') {
            this.router.navigate([`${this.appLang}`]);
          }
        });
    });
  }

  protected signWithFacebook() {
    this.restService.signWithFacebook().then(res => {
      this.restService
        .doFacebook(res?.additionalUserInfo?.profile)
        .subscribe((response: BackendResponse) => {
          if (response.status === 'success') {
            this.router.navigate([`${this.appLang}`]);
          }
        });
    });
  }
}
