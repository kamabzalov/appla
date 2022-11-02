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
    private restService: RestService,
    private languageService: LanguageService,
    private localizeRouterService: LocalizeRouterService,
    private cdr: ChangeDetectorRef
  ) {
    this.locales = this.localizeRouterService.parser.locales;
  }

  public ngOnInit() {
    // this.restService.userState$.subscribe(res => {
    //   console.log(res);
    //   if (res) {
    //     this.currentLang = AppLanguages.find(
    //       lang => lang.id === res.lang_id
    //     )!.code;
    //     this.languageService.setLanguage(this.currentLang);
    //     this.setLang(this.currentLang);
    //   }
    //   this.cdr.markForCheck();
    // });

    this.restService.isAuthorized().subscribe(res => {
      if (res) {
        const langId = res.data.lang_id;
        this.currentLang = AppLanguages.find(lang => lang.id === langId)!.code;
        this.languageService.setLanguage(this.currentLang);
        this.setLang(this.currentLang);
      }
      this.cdr.markForCheck();
    });

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setLang());
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
      const lang_id = AppLanguages.find(lang => lang.code === langCode)!.id;
      this.restService.isAuthorized(lang_id).subscribe();
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
