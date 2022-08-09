import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProductCategoryTileComponent } from './product-category-tile/product-category-tile.component';
import { TileComponent } from './tile/tile.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { StoreOffersComponent } from './store-offers/store-offers.component';

@NgModule({
  declarations: [
    ProductCategoryTileComponent,
    TileComponent,
    HomeComponent,
    StoreOffersComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
