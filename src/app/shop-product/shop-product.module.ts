import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopProductRoutingModule } from './shop-product-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';


@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ShopProductRoutingModule
  ]
})
export class ShopProductModule { }
