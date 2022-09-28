import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryProduct } from '@app/public-site/shop-category/category-page/category-page.component';
import { LanguageService } from '@app/services/language/language.service';

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

  constructor(private languageService: LanguageService) {
    this.appLanguage = languageService.currentAppLang$.getValue()!.code;
  }
}
