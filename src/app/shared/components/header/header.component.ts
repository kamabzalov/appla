import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';
import { SidenavComponent } from '@app/shared/components/sidenav/sidenav.component';
import { RestService } from '@app/services/rest/rest.service';

@Component({
  selector: 'appla-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  protected faBars = faBars;
  protected isLogin: boolean = false;

  constructor(
    private modalService: NgbModal,
    private offCanvas: NgbOffcanvas,
    private cdr: ChangeDetectorRef,
    private restService: RestService
  ) {}

  public ngOnInit() {
    this.restService.isAuthorized().subscribe(res => {
      this.isLogin = res.status === 'success';
    });
  }

  protected openLoginModal() {
    this.modalService
      .open(LoginComponent, { centered: true })
      .dismissed.subscribe(res => {
        this.isLogin = res === 'success';
        this.cdr.markForCheck();
      });
  }

  protected openMobilePanel() {
    this.offCanvas.open(SidenavComponent);
  }

  protected logout() {
    this.restService.logout().subscribe(res => {
      console.log(res);
      this.isLogin = false;
    });
  }
}
