import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCategoryRoutingModule } from '@app/public-site/shop-category/shop-category-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ComparePricesComponent } from '@app/public-site/shop-category/compare-prices/compare-prices.component';
import { CategoryPageComponent } from '@app/public-site/shop-category/category-page/category-page.component';

@NgModule({
  declarations: [CategoryPageComponent, ComparePricesComponent],
  imports: [CommonModule, SharedModule, ShopCategoryRoutingModule],
})
export class ShopCategoryModule {}
