import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LanguageService } from '@app/services/language/language.service';
import { filter, Subscription } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'appla-languages-dropdown',
  templateUrl: './languages-dropdown.component.html',
  styleUrls: ['./languages-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesDropdownComponent implements OnInit, OnDestroy {
  protected currentLang: string;
  protected locales: string[];

  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private localizeRouterService: LocalizeRouterService
  ) {
    this.locales = this.localizeRouterService.parser.locales;
  }

  public ngOnInit() {
    this.currentLang = this.localizeRouterService.parser.currentLang;

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setLang();
      });
  }

  public ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  protected setLang(langCode?: string) {
    // eslint-disable-next-line no-magic-numbers
    if (langCode) {
      this.currentLang = langCode;
      this.languageService.setLanguage(langCode);
      const urlPath = this.router.url.split('/').slice(2);
      if (urlPath.length) {
        this.router.navigate([`/${langCode}/${urlPath.join('/')}`]);
      } else {
        this.router.navigate([`/${langCode}`]);
      }
    }
  }
}
