import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchResultCardComponent } from './search-result-card/search-result-card.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [SearchResultsComponent, SearchResultCardComponent],
  imports: [CommonModule, SharedModule, SearchRoutingModule],
  exports: [SearchResultCardComponent],
})
export class SearchModule {}
