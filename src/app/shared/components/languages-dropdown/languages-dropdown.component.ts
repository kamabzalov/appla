import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AppLanguage,
  LanguageService,
  setAppLang,
} from '@app/services/language/language.service';
import { Observable, tap } from 'rxjs';

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
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  public ngOnInit() {
    this.currentLang$ = this.languageService.currentAppLang$.pipe(
      tap(lang => this.router.navigate([`/${lang.code}`]))
    );
  }

  protected setLang(langCode: string) {
    setAppLang(langCode);
    this.languageService.setLanguage(langCode);
    const activeUrl = this.router.url.split('/');
    const currentLang = this.route.snapshot.params['langCode'];
    const newPathUrl = activeUrl
      // eslint-disable-next-line no-magic-numbers
      .slice(activeUrl.indexOf(currentLang) + 1)
      .join('/');
    this.router.navigate([`/${langCode}/${newPathUrl}`]);
  }
}
