import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'appla-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  constructor(private modalService: NgbModal) {}

  public openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
