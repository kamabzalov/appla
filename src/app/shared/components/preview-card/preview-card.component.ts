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
  protected productLink: string;
  private appLanguage: string;

  constructor(private languageService: LanguageService) {
    this.appLanguage = languageService.currentAppLang$.getValue().code;
  }

  private _product: CategoryProduct;

  public get product() {
    return this._product;
  }

  @Input()
  public set product(val: CategoryProduct) {
    if (val) {
      this.productLink =
        // eslint-disable-next-line no-magic-numbers
        val.count_products > 1
          ? `/${this.appLanguage}/category/product_list/${val.to_link[0].product_slug}?mpi=${val.master_product_id}`
          : `/${this.appLanguage}/product/${val.to_link[0].store_slug}/${val.to_link[0].product_slug}`;
      this._product = val;
    }
  }
}
