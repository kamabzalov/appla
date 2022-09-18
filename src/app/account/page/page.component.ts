import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageService } from '@app/services/language/language.service';
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
    this.languageService.setLanguage(lang);
    const urlPath = this.router.url
      .split('/')
      // eslint-disable-next-line no-magic-numbers
      .slice(2)
      .map(item => {
        // eslint-disable-next-line no-magic-numbers
        if (item.split('?').length > 1) {
          return item.split('?')[0];
        }
        return item;
      });
    const newUrl = `/${lang}/${urlPath.join('/')}`;
    this.router.navigate([newUrl]);
  }
}
