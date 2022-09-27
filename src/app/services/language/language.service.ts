import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentAppLang$: BehaviorSubject<AppLanguage> =
    new BehaviorSubject<AppLanguage>(AppLanguages[1]);

  constructor(public translate: TranslateService) {
    const langs = AppLanguages.map(item => item.code);
    translate.addLangs(langs);
  }

  public setLanguage(langCode: string) {
    const newLang = AppLanguages.find(lang => lang.code == langCode);
    this.translate.use(langCode);
    if (newLang) {
      this.currentAppLang$.next(newLang);
    }
  }
}
