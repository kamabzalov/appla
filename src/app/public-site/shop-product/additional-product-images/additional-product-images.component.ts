import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'appla-additional-product-images',
  templateUrl: './additional-product-images.component.html',
  styleUrls: ['./additional-product-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalProductImagesComponent {
  @Input() public images: string[];

  protected readonly customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
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
