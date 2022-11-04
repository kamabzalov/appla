import { Component } from '@angular/core';
import { NgbActiveModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '@app/services/rest/rest.service';
import { ToastService } from '@app/services/toast/toast.service';
import { NgForm } from '@angular/forms';

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
  protected email: string;
  protected password: string;

  constructor(
    public activeModal: NgbActiveModal,
    private rest: RestService,
    private offCanvas: NgbOffcanvas,
    private toasterService: ToastService
  ) {}

  public auth(loginForm: NgForm) {
    const { email, password } = loginForm.value;
    if (!email || !password || !email.trim() || !password.trim()) {
      this.toasterService.show('Invalid login or password');
      return;
    }
    this.rest.login(email, password).subscribe(result => {
      if (result.status === 'success') {
        this.rest.isAuthorized().subscribe();
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
        .doGoogle(res?.additionalUserInfo?.profile)
        .subscribe(response => {
          if (response.status === 'success') {
            this.offCanvas.dismiss();
          } else {
            this.toasterService.show(response.message);
          }
          this.rest.isAuthorized().subscribe();
          this.activeModal.dismiss(response);
        });
    });
  }

  protected signWithFacebook() {
    this.rest.signWithFacebook().then(res => {
      this.rest
        .doFacebook(res?.additionalUserInfo?.profile)
        .subscribe(response => {
          if (response.status === 'success') {
            this.offCanvas.dismiss();
          } else {
            this.toasterService.show(response.message);
          }
          this.rest.isAuthorized().subscribe();
          this.activeModal.dismiss(response);
        });
    });
  }
}
