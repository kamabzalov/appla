import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from "./category-page/category-page.component";
import { ComparePricesComponent } from "./compare-prices/compare-prices.component";

const routes: Routes = [
  {
    path: '',
    component: CategoryPageComponent,
  },
  {
    path: 'product_list',
    component: ComparePricesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopCategoryRoutingModule {
}
