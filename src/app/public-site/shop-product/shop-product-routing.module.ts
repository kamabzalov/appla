import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  {
    path: ':shop-name/:product-slug',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopProductRoutingModule {}
