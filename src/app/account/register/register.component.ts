import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RestService } from '@app/services/rest/rest.service';
import { LanguageService } from '@app/services/language/language.service';

@Component({
  selector: 'appla-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  protected email: string;
  protected appLang: string;

  constructor(
    private restService: RestService,
    private languageService: LanguageService
  ) {}

  public ngOnInit() {
    this.appLang = this.languageService.currentAppLang$.getValue().code;
  }

  protected sighUp() {
    this.restService.register(this.email).subscribe(data => console.log(data));
  }
}
