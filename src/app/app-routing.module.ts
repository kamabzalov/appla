import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':lang',
    loadChildren: () =>
      import('./public-site/public-site.module').then(m => m.PublicSiteModule),
  },
  {
    path: ':lang/profile-page',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: ':lang/account',
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
