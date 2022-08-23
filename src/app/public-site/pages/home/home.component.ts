import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInTile } from '@app/public-site/product-category-tile/product-category-tile.component';
import { RestService } from '@app/services/rest/rest.service';
import { StoreOffers } from '@app/public-site/store-offers/store-offers.component';
import { RecentlyViewed } from '@app/shared/components/recently-viewed/recently-viewed.component';
import { Trend } from '@app/public-site/now-trending/now-trending.component';
import { Slide } from '@app/shared/components/slider/slider.component';

@Component({
  selector: 'appla-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public sampleSmartphones$: Observable<ProductInTile[]>;
  public sampleKitchenProducts$: Observable<ProductInTile[]>;
  public samplePersonalCareProducts$: Observable<ProductInTile[]>;
  public samplePersonalCleaningProducts$: Observable<ProductInTile[]>;
  public storeOffers$: Observable<StoreOffers[]>;
  public recentlyViewed$: Observable<RecentlyViewed[]>;
  public trending$: Observable<Trend[]>;
  public slides$: Observable<Slide[]>;

  constructor(private restService: RestService) {}

  public ngOnInit(): void {
    this.getSampleSmartphones();
    this.getSampleKitchenProducts();
    this.getSamplePersonalCareProducts();
    this.getCleaningProducts();
    this.getStoreOffers();
    this.getRecentlyViewed();
    this.getTrending();
    this.getSlides();
  }

  private getSlides() {
    this.slides$ = this.restService.getSlides();
  }

  private getSampleSmartphones() {
    this.sampleSmartphones$ = this.restService.getSampleSmartphones();
  }

  private getSampleKitchenProducts() {
    this.sampleKitchenProducts$ = this.restService.getSampleKitchen();
  }

  private getSamplePersonalCareProducts() {
    this.samplePersonalCareProducts$ =
      this.restService.getSamplePersonalCareProducts();
  }

  private getCleaningProducts() {
    this.samplePersonalCleaningProducts$ =
      this.restService.getSampleCleaningProducts();
  }

  private getStoreOffers() {
    this.storeOffers$ = this.restService.getStoreOffers();
  }

  private getRecentlyViewed() {
    this.recentlyViewed$ = this.restService.getRecentlyViewed();
  }

  private getTrending() {
    this.trending$ = this.restService.getTrends();
  }
}
