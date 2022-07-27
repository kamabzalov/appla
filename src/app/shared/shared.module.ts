import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchFormComponent } from './search-form/search-form.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LanguagesDropdownComponent } from './languages-dropdown/languages-dropdown.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    LanguagesDropdownComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [NgbModule, HeaderComponent, FooterComponent, SearchFormComponent, LanguagesDropdownComponent]
})
export class SharedModule {
}
