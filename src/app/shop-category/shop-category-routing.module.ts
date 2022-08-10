import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ComparePricesComponent } from './compare-prices/compare-prices.component';

const routes: Routes = [
  {
    path: 'list/:category-slug',
    component: CategoryPageComponent,
  },
  {
    path: 'product_list/:slug',
    component: ComparePricesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCategoryRoutingModule {}
