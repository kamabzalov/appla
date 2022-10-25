import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  AppLanguages,
  LanguageService,
} from '@app/services/language/language.service';
import { filter, Subscription } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { RestService } from '@app/services/rest/rest.service';

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
    private localizeRouterService: LocalizeRouterService,
    private restService: RestService,
    private cdr: ChangeDetectorRef
  ) {
    this.locales = this.localizeRouterService.parser.locales;
  }

  public ngOnInit() {
    this.restService.isAuthorized().subscribe(res => {
      const langId = res.data.lang_id;
      this.currentLang = AppLanguages.find(
        language => language.id === langId
      )!.code;
      this.cdr.markForCheck();

      this.languageService.setLanguage(this.currentLang);
    });

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setLang(this.localizeRouterService.parser.currentLang);
      });
  }

  public ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  protected setLang(langCode?: string) {
    let newUrl;
    if (langCode) {
      this.currentLang = langCode;
      this.languageService.setLanguage(langCode);
      const queryParams = this.route.snapshot.queryParams;
      const urlPath = decodeURIComponent(this.router.url)
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
      if (urlPath.length) {
        newUrl = `/${langCode}/${urlPath.join('/')}`;
      } else {
        newUrl = `/${langCode}`;
      }
      if (queryParams) {
        this.router.navigate([newUrl], { queryParams: queryParams });
      } else {
        this.router.navigate([newUrl]);
      }
    }
  }
}
