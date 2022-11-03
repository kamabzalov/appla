import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LanguageService } from '@app/services/language/language.service';

@Component({
  selector: 'appla-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  protected lang: 'el' | 'en' | 'ru';

  constructor(private languageService: LanguageService) {}

  public ngOnInit(): void {
    this.languageService.currentAppLang$.asObservable().subscribe(res => {
      if (res) {
        this.lang = res.code;
      }
    });
  }
}
