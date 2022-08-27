import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iconSet } from '@app/shared/utils/icons';

@Component({
  selector: 'appla-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  protected faPhone = iconSet.faPhone;
  protected faEnvelope = iconSet.faEnvelope;

  constructor(private modalService: NgbModal) {}

  public openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
