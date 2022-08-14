import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';

@Component({
  selector: 'appla-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public facebook = faFacebook;
  public faTwitter = faTwitter;
  public faInstagram = faInstagram;
  public faLinkedin = faLinkedin;
  public faYoutube = faYoutube;
  public faTiktok = faTiktok;

  constructor(private modalService: NgbModal) {}

  public openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
