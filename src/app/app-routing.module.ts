import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'Search',
    loadChildren: () =>
      import('./search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./shop-category/shop-category.module').then(
        m => m.ShopCategoryModule
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./shop-product/shop-product.module').then(
        m => m.ShopProductModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./account/account.module').then(m => m.AccountModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
