import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';
import { SidenavComponent } from '@app/shared/components/sidenav/sidenav.component';

@Component({
  selector: 'appla-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected faBars = faBars;

  constructor(
    private modalService: NgbModal,
    private offCanvas: NgbOffcanvas
  ) {}

  public openLoginModal() {
    this.modalService.open(LoginComponent, { centered: true });
  }

  public openMobilePanel() {
    this.offCanvas.open(SidenavComponent);
  }
}
