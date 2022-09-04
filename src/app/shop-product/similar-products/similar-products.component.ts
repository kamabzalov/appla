import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SimilarProduct } from '@app/shop-product/product-page/product-page.component';

@Component({
  selector: 'appla-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarProductsComponent {
  @Input() public similarProducts: SimilarProduct[];

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
}
