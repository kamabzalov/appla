import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '@app/services/rest/rest.service';
import { Router } from '@angular/router';

export interface AuthStatus {
  status: number;
  msg: string;
}

@Component({
  selector: 'appla-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public email: string;
  public password: string;
  public showError: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private rest: RestService,
    private router: Router
  ) {}

  public auth() {
    this.rest.login(this.email, this.password).subscribe(result => {
      if (result.status) {
        this.activeModal.close();
        this.showError = false;
        this.router.navigate(['/profile-page']);
      } else {
        this.showError = true;
      }
    });
  }
}
