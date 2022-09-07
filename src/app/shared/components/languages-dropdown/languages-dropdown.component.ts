import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { setAppLang } from '@app/app.module';

type AppLanguages = 'en' | 'ru' | 'el';

@Component({
  selector: 'appla-languages-dropdown',
  templateUrl: './languages-dropdown.component.html',
  styleUrls: ['./languages-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesDropdownComponent {
  constructor(public translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'ru', 'el']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  protected setLang(langCode: AppLanguages) {
    this.router.navigate([`/${langCode}`]);
    setAppLang(langCode);
    this.translate.use(langCode);
  }
}
