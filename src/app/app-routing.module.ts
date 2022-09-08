import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { setAppLang } from '@app/app.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: setAppLang(),
    pathMatch: 'full',
  },
  {
    path: ':langCode',
    loadChildren: () =>
      import('./public-site/public-site.module').then(m => m.PublicSiteModule),
  },
  {
    path: ':langCode/profile-page',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: ':langCode/account',
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
