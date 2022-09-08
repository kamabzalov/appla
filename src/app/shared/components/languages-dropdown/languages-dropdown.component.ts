import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { setAppLang } from '@app/app.module';

export interface AppLanguage {
  id: number;
  code: 'en' | 'el' | 'ru';
}

export const AppLanguages: AppLanguage[] = [
  {
    id: 1,
    code: 'en',
  },
  {
    id: 2,
    code: 'el',
  },
  {
    id: 3,
    code: 'ru',
  },
];

@Component({
  selector: 'appla-languages-dropdown',
  templateUrl: './languages-dropdown.component.html',
  styleUrls: ['./languages-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesDropdownComponent {
  protected currentLang: AppLanguage = AppLanguages[1];

  constructor(public translate: TranslateService, private router: Router) {
    const langs = AppLanguages.map(item => item.code);
    translate.addLangs(langs);
    translate.use('el');
  }

  protected setLang(langCode: string) {
    this.router.navigate([`/${langCode}`]);
    setAppLang(langCode);
    const newLang = AppLanguages.find(lang => lang.code == langCode);
    if (newLang) {
      this.currentLang = newLang;
      this.translate.use(langCode);
    }
  }
}
