import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchFormComponent } from './search-form/search-form.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LanguagesDropdownComponent } from './languages-dropdown/languages-dropdown.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CartWidgetComponent } from './cart-widget/cart-widget.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { SliderComponent } from './slider/slider.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from "ngx-owl-carousel-o";
import { AdvertiseBannerComponent } from './advertise-banner/advertise-banner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    LanguagesDropdownComponent,
    CartWidgetComponent,
    NavigationComponent,
    SliderComponent,
    CarouselComponent,
    AdvertiseBannerComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    CarouselModule,
  ],
  exports: [
    NgbModule,
    FontAwesomeModule,
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    LanguagesDropdownComponent,
    CartWidgetComponent,
    NavigationComponent,
    SliderComponent,
    CarouselComponent,
    AdvertiseBannerComponent,
  ]
})
export class SharedModule {
}
