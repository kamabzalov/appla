import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';

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
}
