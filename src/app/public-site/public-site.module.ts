import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSiteRoutingModule } from './public-site-routing.module';
import { NowTrendingComponent } from '@app/public-site/now-trending/now-trending.component';
import { ProductCategoryTileComponent } from '@app/public-site/product-category-tile/product-category-tile.component';
import { StoreOffersComponent } from '@app/public-site/store-offers/store-offers.component';
import { TileComponent } from '@app/public-site/tile/tile.component';
import { SharedModule } from '@app/shared/shared.module';
import { PageComponent } from './pages/page.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [
    NowTrendingComponent,
    ProductCategoryTileComponent,
    StoreOffersComponent,
    TileComponent,
    PageComponent,
    HomeComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
  ],
  imports: [CommonModule, PublicSiteRoutingModule, SharedModule],
})
export class PublicSiteModule {}
