import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryPageComponent,
  },
  {
    path: 'list/:category-slug',
    component: CategoryPageComponent,
  },
  // {
  //   path: 'product_list/:slug',
  //   component: ComparePricesComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCategoryRoutingModule {}
