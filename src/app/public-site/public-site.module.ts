import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSiteRoutingModule } from './public-site-routing.module';
import { NowTrendingComponent } from '@app/public-site/now-trending/now-trending.component';
import { ProductCategoryTileComponent } from '@app/public-site/product-category-tile/product-category-tile.component';
import { StoreOffersComponent } from '@app/public-site/store-offers/store-offers.component';
import { TileComponent } from '@app/public-site/tile/tile.component';
import { SharedModule } from '@app/shared/shared.module';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    NowTrendingComponent,
    ProductCategoryTileComponent,
    StoreOffersComponent,
    TileComponent,
    PageComponent,
    HomeComponent,
  ],
  imports: [CommonModule, PublicSiteRoutingModule, SharedModule],
})
export class PublicSiteModule {}
