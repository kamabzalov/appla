import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInTile } from '@app/public-site/product-category-tile/product-category-tile.component';
import { RestService } from '@app/services/rest/rest.service';
import { StoreOffers } from '@app/public-site/store-offers/store-offers.component';
import { RecentlyViewed } from '@app/shared/components/recently-viewed/recently-viewed.component';
import { Trend } from '@app/public-site/now-trending/now-trending.component';
import { Slide } from '@app/shared/components/slider/slider.component';
import { LanguageService } from '@app/services/language/language.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
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

  constructor(
    private restService: RestService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.languageService.currentAppLang$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if (res) {
          this.getPageData();
          this.cdr.markForCheck();
        }
      });
    this.restService.isLogin$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(_ => this.getRecentlyViewed());
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

  private getPageData() {
    this.getSampleSmartphones();
    this.getSampleKitchenProducts();
    this.getSamplePersonalCareProducts();
    this.getCleaningProducts();
    this.getStoreOffers();
    this.getRecentlyViewed();
    this.getTrending();
    this.getSlides();
  }
}
