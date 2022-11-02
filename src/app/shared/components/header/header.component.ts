import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoginDialogComponent } from '@app/shared/components/modal/login-dialog/login-dialog.component';
import { RestService, UserState } from '@app/services/rest/rest.service';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { iconSet } from '@app/shared/utils/icons';
import { LanguageService } from '@app/services/language/language.service';
import { SidenavComponent } from '@app/shared/components/sidenav/sidenav.component';

@Component({
  selector: 'appla-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected faBars = iconSet.faBars;
  protected userState$: BehaviorSubject<UserState | null> =
    new BehaviorSubject<UserState | null>(null);
  protected isMainPage: boolean = true;
  private router$: Subscription;

  constructor(
    private modalService: NgbModal,
    private offCanvas: NgbOffcanvas,
    private cdr: ChangeDetectorRef,
    private restService: RestService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.restService.isAuthorized().subscribe();
    // eslint-disable-next-line no-magic-numbers
    this.isMainPage = this.router.url.split('/').length === 2;
    this.router$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // eslint-disable-next-line no-magic-numbers
        this.isMainPage = event.url.split('/').length === 2;
        this.cdr.markForCheck();
      }
    });
    this.userState$ = this.restService.userState$;
  }

  public ngOnDestroy() {
    if (this.router$) {
      this.router$.unsubscribe();
    }
  }

  protected openLoginModal() {
    this.modalService
      .open(LoginDialogComponent, { centered: true })
      .dismissed.subscribe(res => {
        this.restService.isAuthorized().subscribe();
      });
  }

  protected openMobilePanel() {

    const user = this.userState$.getValue();
    if (user?.user_data) {
      window.location.href = 'https://profile.angular.appla.cy/';
    } else {
      this.offCanvas.open(SidenavComponent);
    }
  }

  protected logout() {
    this.restService.logout().subscribe();
  }
}
