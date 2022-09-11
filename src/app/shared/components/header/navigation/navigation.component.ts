import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RestService } from '@app/services/rest/rest.service';
import { Observable, switchMap } from 'rxjs';
import { LanguageService } from '@app/services/language/language.service';

export interface Menu {
  id: number;
  name: string;
  childs: FirstLevel[];
  commercial_products: CommercialProduct[];
}

interface FirstLevel {
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
  protected appLanguage: string;

  constructor(
    private restService: RestService,
    private languageService: LanguageService
  ) {}

  public ngOnInit(): void {
    this.appLanguage = this.languageService.currentAppLang$.getValue().code;
    this.menu$ = this.languageService.currentAppLang$.pipe(
      switchMap(lang => this.restService.getSiteMenu())
    );
  }

  protected toggleMore(menuLevel: FirstLevel) {
    menuLevel.toggle = !menuLevel.toggle;
  }
}
