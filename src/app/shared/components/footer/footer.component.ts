import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginDialogComponent } from '@app/shared/components/modal/login-dialog/login-dialog.component';
import { iconSet } from '@app/shared/utils/icons';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RestService } from '@app/services/rest/rest.service';

@Component({
  selector: 'appla-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  protected facebook = iconSet.faFacebook;
  protected faTwitter = iconSet.faTwitter;
  protected faInstagram = iconSet.faInstagram;
  protected faLinkedin = iconSet.faLinkedin;
  protected faYoutube = iconSet.faYoutube;
  protected faTiktok = iconSet.faTiktok;
  protected year = new Date();
  protected isMainPage: boolean = true;
  protected isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private router$: Subscription;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private restService: RestService
  ) {}

  public ngOnInit() {
    this.router$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // eslint-disable-next-line no-magic-numbers
        this.isMainPage = event.url.split('/').length === 2;
        this.cdr.markForCheck();
      }
    });
    // this.isLogin$ = this.restService.isLogin$;
  }

  public openLoginModal() {
    this.modalService.open(LoginDialogComponent);
  }
}
