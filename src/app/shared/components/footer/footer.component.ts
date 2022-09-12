import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';
import { iconSet } from '@app/shared/utils/icons';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  private router$: Subscription;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.router$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // eslint-disable-next-line no-magic-numbers
        this.isMainPage = event.url.split('/').length === 2;
        this.cdr.markForCheck();
      }
    });
  }

  public openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
