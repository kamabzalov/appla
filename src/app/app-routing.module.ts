import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public-site/public-site.module').then(m => m.PublicSiteModule),
  },
  {
    path: 'profile-page',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'account',
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
