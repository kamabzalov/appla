import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trend } from '@app/public-site/now-trending/now-trending.component';
import { ProductInTile } from '@app/public-site/product-category-tile/product-category-tile.component';
import { StoreOffers } from '@app/public-site/store-offers/store-offers.component';
import {
  SearchResults,
  Slugs,
} from '@app/public-site/search/search-results/search-results.component';
import { Menu } from '@app/shared/components/header/navigation/navigation.component';
import { RecentlyViewed } from '@app/shared/components/recently-viewed/recently-viewed.component';
import { Slide } from '@app/shared/components/slider/slider.component';
import { map, Observable } from 'rxjs';
import { Product } from '@app/public-site/shop-product/product-page/product-page.component';
import { ProductOffer } from '@app/public-site/shop-category/compare-prices/compare-prices.component';
import {
  Category,
  ProductFilter,
} from '@app/public-site/shop-category/category-page/category-page.component';
import { LanguageService } from '@app/services/language/language.service';

interface BackendResponse {
  data: any;
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private basePath = 'https://stage.appla.cy/';

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  public getSiteMenu(): Observable<Menu[]> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Header/top_menu?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSlides(): Observable<Slide[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Home/home_slider_top`)
      .pipe(map(response => response.data));
  }

  public getStoreOffers(): Observable<StoreOffers[]> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/get_store_offers?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getRecentlyViewed(): Observable<RecentlyViewed[]> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/get_recently_viewed?store_id=false&user_id=&name=name1&lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getTrends(): Observable<Trend[]> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/get_now_trending?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSampleSmartphones(): Observable<ProductInTile[]> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/sample_smartphones?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSampleKitchen(): Observable<ProductInTile[]> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/sample_kitchen?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSamplePersonalCareProducts(): Observable<ProductInTile[]> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/sample_personal_care?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSampleCleaningProducts(): Observable<ProductInTile[]> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/sample_cleaning?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getAllProductCategories(
    limit: number,
    offset: number,
    order: string,
    slug: string,
    minPrice?: number | null,
    maxPrice?: number | null,
    searchQuery?: string | undefined
  ): Observable<Category> {
    let params = new HttpParams()
      .set('slug', slug)
      .set('limit', limit)
      .set('offset', offset)
      .set('order', order);
    if (minPrice) {
      params = params.set('min_price', minPrice);
    }
    if (maxPrice) {
      params = params.set('max_price', maxPrice);
    }
    if (searchQuery) {
      params = params.set('search', searchQuery);
    }
    const langId = this.languageService.currentAppLang$.getValue().id;
    params = params.set('lang_id', langId);
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Categories/get_category_products`,
        {
          params,
        }
      )
      .pipe(
        map(response => {
          if (response.data.filter) {
            const filters: any = (response.data as Category).filters;
            const filterKeys = Object.keys(filters);
            const productFilters: ProductFilter[] = filterKeys.map(key => {
              return {
                filterKey: key,
                filterValue: filters[key],
              };
            });
            return { ...response.data, filters: productFilters };
          }
          return response.data;
        })
      );
  }

  public getProductBySlug(
    storeSlug: string,
    productSlug: string
  ): Observable<Product> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Products/get_product?product_slug=${productSlug}&store_slug=${storeSlug}&lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public searchInShop(query: string): Observable<SearchResults> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Search?string=${query}`)
      .pipe(map(response => response.data));
  }

  public searchProducts(query: string): Observable<SearchResults> {
    const langId = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Search?string=${query}&lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public login(email: string, password: string): Observable<BackendResponse> {
    const lang_id = this.languageService.currentAppLang$.getValue().id;
    return this.http.post<BackendResponse>(
      `${this.basePath}Angular/Auth/doSignin`,
      {
        email,
        password,
        lang_id,
      }
    );
  }

  public register(email: string): Observable<BackendResponse> {
    const lang_id = this.languageService.currentAppLang$.getValue().id;
    return this.http.post<BackendResponse>(
      `${this.basePath}Angular/Auth/doSignup`,
      { email, lang_id }
    );
  }

  public isAuthorized(): Observable<BackendResponse> {
    return this.http.get<BackendResponse>(
      `${this.basePath}Angular/Auth/checkAuth`
    );
  }

  public logout(): Observable<BackendResponse> {
    const lang_id = this.languageService.currentAppLang$.getValue().id;
    return this.http.get<BackendResponse>(
      `${this.basePath}logout?lang_id=${lang_id}`
    );
  }

  public getProductOffer(
    productSlug: string,
    masterProductId: number
  ): Observable<ProductOffer> {
    const lang_id = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Compare/compare_product?slug=${productSlug}&mpi=${masterProductId}&lang_id=${lang_id}`
      )
      .pipe(map(response => response.data));
  }

  public getProductByMasterId(id: number): Observable<Slugs[]> {
    const lang_id = this.languageService.currentAppLang$.getValue().id;
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Search/mpi_to_slug?mpi=${id}&lang_id=${lang_id}`
      )
      .pipe(map(response => response.data));
  }
}
