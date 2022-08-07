import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [SharedModule, CommonModule, SearchRoutingModule],
})
export class SearchModule {}
