import { Component } from '@angular/core';
import { NgbActiveModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '@app/services/rest/rest.service';
import { ToastService } from '@app/services/toast/toast.service';

export interface AuthStatus {
  status: number;
  msg: string;
}

@Component({
  selector: 'appla-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  protected showError: boolean;
  protected email: string;
  protected password: string;

  constructor(
    public activeModal: NgbActiveModal,
    private rest: RestService,
    private offCanvas: NgbOffcanvas,
    private toasterService: ToastService
  ) {}

  public auth() {
    if (!this.email.trim() || !this.password.trim()) {
      this.showError = true;
      return;
    }
    this.rest.login(this.email, this.password).subscribe(result => {
      this.showError = result.status === 'failed';
      if (result.status === 'success') {
        this.activeModal.dismiss(result.status);
        this.offCanvas.dismiss();
      } else {
        this.toasterService.show(result.message);
      }
    });
  }

  protected signWithGoogle() {
    this.rest.signWithGoogle().then(res => {
      this.rest
        .doGoogle(res.additionalUserInfo?.profile)
        .subscribe(response => {
          if (response.status === 'success') {
            this.offCanvas.dismiss();
          } else {
            this.toasterService.show(response.message);
          }
          this.activeModal.dismiss(response);
        });
    });
  }

  protected signWithFacebook() {
    this.rest.signWithFacebook().then(res => {
      this.rest
        .doFacebook(res.additionalUserInfo?.profile)
        .subscribe(response => {
          if (response.status === 'success') {
            this.offCanvas.dismiss();
          } else {
            this.toasterService.show(response.message);
          }
          this.activeModal.dismiss(response);
        });
    });
  }
}
