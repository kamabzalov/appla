import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopProductRoutingModule } from './shop-product-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductPageComponent],
  imports: [CommonModule, SharedModule, ShopProductRoutingModule],
})
export class ShopProductModule {}
