import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from '@app/public-site/pages/page.component';
import { HomeComponent } from '@app/public-site/pages/home/home.component';
import { AboutUsComponent } from '@app/public-site/pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from '@app/public-site/pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from '@app/public-site/pages/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'aboutus',
        component: AboutUsComponent,
      },
      {
        path: 'privacy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'terms',
        component: TermsAndConditionsComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicSiteRoutingModule {}
