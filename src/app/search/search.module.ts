import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultCardComponent } from './search-result-card/search-result-card.component';

@NgModule({
  declarations: [SearchResultsComponent, SearchResultCardComponent],
  imports: [CommonModule, SearchRoutingModule],
})
export class SearchModule {}
