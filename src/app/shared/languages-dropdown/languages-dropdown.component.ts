import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

type AppLanguages = 'en' | 'ru' | 'gre';

@Component({
  selector: 'appla-languages-dropdown',
  templateUrl: './languages-dropdown.component.html',
  styleUrls: ['./languages-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagesDropdownComponent {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru', 'gre']);
    translate.setDefaultLang('en');

  }

  setLang(langCode: AppLanguages) {
    this.translate.use(langCode);
  }
}
