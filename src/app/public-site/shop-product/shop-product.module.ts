import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopProductRoutingModule } from './shop-product-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { AdditionalProductImagesComponent } from './additional-product-images/additional-product-images.component';

@NgModule({
  declarations: [ProductPageComponent, AdditionalProductImagesComponent],
  imports: [CommonModule, SharedModule, ShopProductRoutingModule],
})
export class ShopProductModule {}
