import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LanguageService } from '@app/services/language/language.service';

@Component({
  selector: 'appla-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  protected appLang: string;

  constructor(private languageService: LanguageService) {}

  public ngOnInit() {
    this.appLang = this.languageService.currentAppLang$.getValue().code;
  }
}
