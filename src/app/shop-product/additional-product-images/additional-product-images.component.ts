import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-additional-product-images',
  templateUrl: './additional-product-images.component.html',
  styleUrls: ['./additional-product-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalProductImagesComponent {
  constructor() {}
}
