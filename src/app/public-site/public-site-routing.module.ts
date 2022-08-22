import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from '@app/public-site/pages/page.component';
import { HomeComponent } from '@app/public-site/pages/home/home.component';
import { AboutUsComponent } from '@app/public-site/pages/about-us/about-us.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicSiteRoutingModule {}
