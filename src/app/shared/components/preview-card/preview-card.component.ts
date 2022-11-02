import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryProduct } from '@app/public-site/shop-category/category-page/category-page.component';
import {
  AppLanguages,
  LanguageService,
} from '@app/services/language/language.service';
import { RestService } from '@app/services/rest/rest.service';

@Component({
  selector: 'appla-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewCardComponent {
  @Input() public product: CategoryProduct;
  protected productLink: string;
  protected appLanguage: string;

  constructor(
    private languageService: LanguageService,
    private restService: RestService
  ) {
    this.restService.userState$.asObservable().subscribe(res => {
      if (res) {
        this.appLanguage = AppLanguages.find(
          lang => lang.id === res.lang_id
        )!.code;
      }
    });
  }
}
