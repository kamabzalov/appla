import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopProductRoutingModule } from './shop-product-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { AdditionalProductImagesComponent } from './additional-product-images/additional-product-images.component';
import { SuccessAddCartDialogComponent } from './modal/success-add-cart-dialog/success-add-cart-dialog.component';

@NgModule({
  declarations: [ProductPageComponent, AdditionalProductImagesComponent, SuccessAddCartDialogComponent],
  imports: [CommonModule, SharedModule, ShopProductRoutingModule],
})
export class ShopProductModule {}
