import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';

@Component({
  selector: 'appla-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public faBars = faBars;

  constructor(private modalService: NgbModal) {}

  public openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
