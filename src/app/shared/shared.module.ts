import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguagesDropdownComponent } from './languages-dropdown/languages-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { SliderComponent } from './slider/slider.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AdvertiseBannerComponent } from './advertise-banner/advertise-banner.component';
import { PreviewCardComponent } from './preview-card/preview-card.component';
import { AsideWidgetComponent } from './aside-widget/aside-widget.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    PreviewCardComponent,
    AsideWidgetComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
    FontAwesomeModule,
    CarouselModule,
  ],
  exports: [
    NgbModule,
    FontAwesomeModule,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    LanguagesDropdownComponent,
    CartWidgetComponent,
    NavigationComponent,
    SliderComponent,
    CarouselComponent,
    AdvertiseBannerComponent,
    PreviewCardComponent,
    AsideWidgetComponent,
  ],
})
export class SharedModule {}
