import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopProductRoutingModule } from './shop-product-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { SharedModule } from '../shared/shared.module';
import { SimilarProductsComponent } from './similar-products/similar-products.component';
import { AdditionalProductImagesComponent } from './additional-product-images/additional-product-images.component';

@NgModule({
  declarations: [ProductPageComponent, SimilarProductsComponent, AdditionalProductImagesComponent],
  imports: [CommonModule, SharedModule, ShopProductRoutingModule],
})
export class ShopProductModule {}
