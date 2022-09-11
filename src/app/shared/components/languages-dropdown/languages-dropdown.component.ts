import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AppLanguage,
  AppLanguages,
  LanguageService,
  setAppLang,
} from '@app/services/language/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'appla-languages-dropdown',
  templateUrl: './languages-dropdown.component.html',
  styleUrls: ['./languages-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesDropdownComponent implements OnInit {
  protected currentLang$: Observable<AppLanguage>;

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  public ngOnInit() {
    this.currentLang$ = this.languageService.currentAppLang$;
  }

  protected setLang(langCode: string) {
    this.router.navigate([`/${langCode}`]);
    setAppLang(langCode);
    const newLang = AppLanguages.find(lang => lang.code == langCode);
    if (newLang) {
      this.languageService.currentAppLang$.next(newLang);
      this.languageService.setLanguage(langCode);
    }
  }
}
