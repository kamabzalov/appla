import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';
import { SidenavComponent } from '@app/shared/components/sidenav/sidenav.component';
import { RestService } from '@app/services/rest/rest.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { iconSet } from '@app/shared/utils/icons';

@Component({
  selector: 'appla-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected faBars = iconSet.faBars;
  protected isLogin: boolean = false;
  protected isMainPage: boolean = true;
  private router$: Subscription;

  constructor(
    private modalService: NgbModal,
    private offCanvas: NgbOffcanvas,
    private cdr: ChangeDetectorRef,
    private restService: RestService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.router$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // eslint-disable-next-line no-magic-numbers
        this.isMainPage = event.url.split('/').length === 2;
        this.cdr.markForCheck();
      }
    });
    this.restService.isAuthorized().subscribe(res => {
      this.isLogin = res.status === 'success';
    });
  }

  public ngOnDestroy() {
    if (this.router$) {
      this.router$.unsubscribe();
    }
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
      this.isLogin = false;
    });
  }
}
