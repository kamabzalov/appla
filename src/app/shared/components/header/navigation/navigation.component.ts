import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RestService } from '@app/services/rest/rest.service';
import {
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import {
  AppLanguage,
  LanguageService,
} from '@app/services/language/language.service';
import { NavigationEnd, Router } from '@angular/router';

export interface Menu {
  id: number;
  name: string;
  childs: FirstLevel[];
  commercial_products: CommercialProduct[];
}

export interface FirstLevel {
  name: string;
  link: string;
  childs: SecondLevel[];
  toggle: boolean;
}

interface SecondLevel {
  name: string;
  value: string;
}

interface CommercialProduct {
  name: string;
  slug: string;
  store_slug: string;
  price: string;
  image: string;
}

@Component({
  selector: 'appla-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  protected menu$: Observable<Menu[]>;
  protected appLanguage$: Observable<AppLanguage>;
  protected isMainPage: boolean = true;
  private router$: Subscription;

  constructor(
    private restService: RestService,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.appLanguage$ = this.languageService.currentAppLang$.asObservable();
    this.menu$ = this.languageService.currentAppLang$.pipe(
      distinctUntilChanged(),
      switchMap(_ => this.restService.getSiteMenu())
    );
    this.router$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // eslint-disable-next-line no-magic-numbers
        this.isMainPage = event.url.split('/').length === 2;
        this.cdr.markForCheck();
      }
    });
  }

  protected toggleMore(menuLevel: FirstLevel) {
    menuLevel.toggle = !menuLevel.toggle;
  }
}
