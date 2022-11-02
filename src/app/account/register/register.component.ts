import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BackendResponse, RestService } from '@app/services/rest/rest.service';
import { LanguageService } from '@app/services/language/language.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '@app/shared/components/modal/confirm-dialog/confirm-dialog.component';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { iconSet } from '@app/shared/utils/icons';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'appla-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  protected email: string;
  protected currentLang: string;

  protected faFacebook = iconSet.faFacebook;
  protected faGoogle = iconSet.faGoogle;

  constructor(
    private restService: RestService,
    private languageService: LanguageService,
    private router: Router,
    private modal: NgbModal,
    private localizeRouterService: LocalizeRouterService,
    private toastService: ToastService
  ) {}

  public ngOnInit() {
    this.currentLang = this.localizeRouterService.parser.currentLang;
    this.languageService.setLanguage(this.currentLang);
  }

  protected sighUp() {
    this.restService.register(this.email).subscribe(data => {
      const modal = this.modal.open(ConfirmDialogComponent);
      modal.componentInstance.text = data.message;
      if (data.status === 'success') {
        this.router.navigate([`/${this.currentLang}`]).then();
      }
    });
  }

  protected signWithGoogle() {
    this.restService.signWithGoogle().then(res => {
      this.restService
        .doGoogle(res?.additionalUserInfo?.profile)
        .subscribe((response: BackendResponse) => {
          if (response.status === 'success') {
            this.router.navigate([`${this.currentLang}`]);
          } else {
            this.toastService.show(response.message);
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
            this.router.navigate([`${this.currentLang}`]);
          } else {
            this.toastService.show(response.message);
          }
        });
    });
  }
}
