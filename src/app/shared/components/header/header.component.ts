import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoginDialogComponent } from '@app/shared/components/modal/login-dialog/login-dialog.component';
import { RestService } from '@app/services/rest/rest.service';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { iconSet } from '@app/shared/utils/icons';
import { SidenavComponent } from '@app/shared/components/sidenav/sidenav.component';
import { LanguageService } from '@app/services/language/language.service';

@Component({
  selector: 'appla-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected faBars = iconSet.faBars;
  protected isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
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
    // eslint-disable-next-line no-magic-numbers
    this.isMainPage = this.router.url.split('/').length === 2;
    this.router$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // eslint-disable-next-line no-magic-numbers
        this.isMainPage = event.url.split('/').length === 2;
        this.cdr.markForCheck();
      }
    });
    this.restService.userState$
      .asObservable()
      .subscribe(res => console.log(res));
    // this.isLogin$ = this.restService.isLogin$;
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
        // this.isLogin$ = this.restService.isLogin$;
      });
  }

  protected openMobilePanel() {
    // const isLogged = this.restService.isLogin$.getValue();
    const isLogged = false;
    if (isLogged) {
      window.location.href = 'https://profile.angular.appla.cy/';
    } else {
      this.offCanvas.open(SidenavComponent);
    }
  }

  protected logout() {
    this.restService.logout().subscribe();
  }
}
