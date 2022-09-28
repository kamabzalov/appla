import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SimilarProduct } from '@app/public-site/shop-product/product-page/product-page.component';
import { ProductOfferSimilar } from '@app/public-site/shop-category/compare-prices/compare-prices.component';
import { LanguageService } from '@app/services/language/language.service';

@Component({
  selector: 'appla-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarProductsComponent implements OnInit {
  @Input() public similarProducts: SimilarProduct[] | ProductOfferSimilar[];
  protected appLang: string;

  protected readonly customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoWidth: true,
    navText: ['<button>&#x2039;</button>', '<button>&#x203A;</button>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  constructor(private languageService: LanguageService) {}

  public ngOnInit() {
    this.appLang = this.languageService.currentAppLang$.getValue()!.code;
  }
}
