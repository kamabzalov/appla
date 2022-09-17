import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguagesDropdownComponent } from './components/languages-dropdown/languages-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartWidgetComponent } from './components/cart-widget/cart-widget.component';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { SliderComponent } from './components/slider/slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AdvertiseBannerComponent } from './components/advertise-banner/advertise-banner.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { AsideWidgetComponent } from './components/aside-widget/aside-widget.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RecentlyViewedComponent } from '@app/shared/components/recently-viewed/recently-viewed.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/modal/login/login.component';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CloseCanvasDirective } from './directives/close-canvas/close-canvas.directive';
import { CloseDropdownDirective } from './directives/close-dropdown/close-dropdown.directive';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { SimilarProductsComponent } from '@app/shared/components/similar-products/similar-products.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';

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
    AdvertiseBannerComponent,
    PreviewCardComponent,
    AsideWidgetComponent,
    RecentlyViewedComponent,
    LoginComponent,
    SidenavComponent,
    CloseCanvasDirective,
    CloseDropdownDirective,
    ScrollTopComponent,
    SimilarProductsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule,
    CarouselModule,
    TranslateModule,
    NgxImageZoomModule,
  ],
  exports: [
    NgbModule,
    FontAwesomeModule,
    TranslateModule,
    CarouselModule,
    FormsModule,
    NgxImageZoomModule,
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    LanguagesDropdownComponent,
    CartWidgetComponent,
    NavigationComponent,
    SliderComponent,
    AdvertiseBannerComponent,
    PreviewCardComponent,
    AsideWidgetComponent,
    RecentlyViewedComponent,
    ScrollTopComponent,
    SimilarProductsComponent,
    SidenavComponent,
    CloseCanvasDirective,
  ],
})
export class SharedModule {}
