import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LanguageService,
  setAppLang,
} from '@app/services/language/language.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'appla-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  protected setLang(lang: 'en' | 'el' | 'ru') {
    setAppLang(lang);
    this.languageService.setLanguage(lang);
    const activeUrl = this.router.url.split('/');
    const currentLang = this.route.snapshot.params['langCode'];
    const newPathUrl = activeUrl
      // eslint-disable-next-line no-magic-numbers
      .slice(activeUrl.indexOf(currentLang) + 1)
      .join('/');
    this.router.navigate([`/${lang}/${newPathUrl}`]);
  }
}
