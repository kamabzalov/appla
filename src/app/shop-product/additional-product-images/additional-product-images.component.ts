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
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoWidth: true,
    navText: ['', ''],
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
