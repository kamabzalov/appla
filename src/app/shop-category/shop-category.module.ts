import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCategoryRoutingModule } from './shop-category-routing.module';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    CategoryPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopCategoryRoutingModule
  ]
})
export class ShopCategoryModule {
}
