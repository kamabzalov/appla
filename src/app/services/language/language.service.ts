import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

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
  public currentAppLang$: BehaviorSubject<AppLanguage | null> =
    new BehaviorSubject<AppLanguage | null>(null);

  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const langs = AppLanguages.map(item => item.code);
    translate.addLangs(langs);
  }

  public setLanguage(langCode: string) {
    const newLang = AppLanguages.find(lang => lang.code == langCode);
    this.document.documentElement.lang = langCode;
    this.translate.use(langCode);
    if (newLang) {
      this.currentAppLang$.next(newLang);
    }
  }
}
