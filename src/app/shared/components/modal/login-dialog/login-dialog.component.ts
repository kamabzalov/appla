import { Component } from '@angular/core';
import { NgbActiveModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '@app/services/rest/rest.service';

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
    private offCanvas: NgbOffcanvas
  ) {}

  public auth() {
    this.rest.login(this.email, this.password).subscribe(result => {
      this.showError = result.status === 'failed';
      if (result.status === 'success') {
        this.activeModal.dismiss(result.status);
        this.offCanvas.dismiss();
      }
    });
  }

  protected signWithGoogle() {
    this.rest.signWithGoogle().then(res => {
      console.log(res.additionalUserInfo?.profile);
      this.rest
        .doGoogle(res.additionalUserInfo?.profile)
        .subscribe(res => console.log(res));
    });
  }

  protected signWithFacebook() {
    this.rest.signWithFacebook().then();
  }
}
