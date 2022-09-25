import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { RestService } from '@app/services/rest/rest.service';
import { Router } from '@angular/router';

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
}
