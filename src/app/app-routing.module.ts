import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
