import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trend } from '@app/public-site/now-trending/now-trending.component';
import { ProductInTile } from '@app/public-site/product-category-tile/product-category-tile.component';
import { StoreOffers } from '@app/public-site/store-offers/store-offers.component';
import {
  SearchProduct,
  SearchResults,
  Slugs,
} from '@app/public-site/search/search-results/search-results.component';
import { Menu } from '@app/shared/components/header/navigation/navigation.component';
import { AuthStatus } from '@app/shared/components/modal/login/login.component';
import { RecentlyViewed } from '@app/shared/components/recently-viewed/recently-viewed.component';
import { Slide } from '@app/shared/components/slider/slider.component';
import { makeRelativePath } from '@app/shared/utils/functions';
import { map, Observable, share } from 'rxjs';
import { Product } from '@app/public-site/shop-product/product-page/product-page.component';
import { ProductOffer } from '@app/public-site/shop-category/compare-prices/compare-prices.component';
import {
  Category,
  ProductFilter,
} from '@app/public-site/shop-category/category-page/category-page.component';
import {
  AppLanguage,
  AppLanguages,
} from '@app/shared/components/languages-dropdown/languages-dropdown.component';

interface BackendResponse {
  data: any;
  message: string;
  status: string;
}

let langId = AppLanguages.find(lang => lang.code === 'el')?.id;

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private basePath = 'https://stage.appla.cy/Angular/';

  constructor(private http: HttpClient) {}

  public getSiteMenu(langCode?: string): Observable<Menu[]> {
    const lang: AppLanguage | undefined = AppLanguages.find(
      lang => lang.code === langCode
    );
    if (lang) {
      langId = lang.id;
    }
    return this.http
      .get<BackendResponse>(`${this.basePath}Header/top_menu?lang_id=${langId}`)
      .pipe(map(response => response.data));
  }

  public getSlides(): Observable<Slide[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Home/home_slider_top`)
      .pipe(
        share(),
        map((slides: BackendResponse) => {
          return (slides.data as Slide[]).map(item => ({
            ...item,
            link: makeRelativePath(item.link),
          }));
        })
      );
  }

  public getStoreOffers(): Observable<StoreOffers[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Home/get_store_offers`)
      .pipe(map(response => response.data));
  }

  public getRecentlyViewed(): Observable<RecentlyViewed[]> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Home/get_recently_viewed?store_id=false&user_id=&name=name1`
      )
      .pipe(map(response => response.data));
  }

  public getTrends(): Observable<Trend[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Home/get_now_trending`)
      .pipe(map(response => response.data));
  }

  public getSampleSmartphones(): Observable<ProductInTile[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Home/sample_smartphones`)
      .pipe(map(response => response.data));
  }

  public getSampleKitchen(): Observable<ProductInTile[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Home/sample_kitchen`)
      .pipe(map(response => response.data));
  }

  public getSamplePersonalCareProducts(): Observable<ProductInTile[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Home/sample_personal_care`)
      .pipe(map(response => response.data));
  }

  public getSampleCleaningProducts(): Observable<ProductInTile[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Home/sample_cleaning`)
      .pipe(map(response => response.data));
  }

  public getAllProductCategories(
    limit: number,
    offset: number,
    order: string,
    slug: string,
    minPrice?: number,
    maxPrice?: number,
    searchQuery?: string
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
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Categories/get_category_products`,
        {
          params,
        }
      )
      .pipe(
        map(response => {
          const filters: any = (response.data as Category).filters;
          const filterKeys = Object.keys(filters);
          const productFilters: ProductFilter[] = filterKeys.map(key => {
            return {
              filterKey: key,
              filterValue: filters[key],
            };
          });
          return { ...response.data, filters: productFilters };
        })
      );
  }

  public getProductBySlug(
    storeSlug: string,
    productSlug: string
  ): Observable<Product> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Products/get_product?product_slug=${productSlug}&slug_store=${storeSlug}`
      )
      .pipe(map(response => response.data));
  }

  public searchInShop(query: string): Observable<SearchResults> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Search?string=${query}`)
      .pipe(map(response => response.data));
  }

  public searchProducts(query: string): Observable<SearchProduct[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Search?string=${query}`)
      .pipe(map(response => (response.data as SearchResults).products));
  }

  public login(email: string, password: string): Observable<AuthStatus> {
    return this.http.get<AuthStatus>(
      `${this.basePath}login?email=${email}&password=${password}`
    );
  }

  public getProductOffer(
    productSlug: string,
    masterProductId: number
  ): Observable<ProductOffer> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Compare/compare_product?slug=${productSlug}&mpi=${masterProductId}`
      )
      .pipe(map(response => response.data));
  }

  public getProductByMasterId(id: number): Observable<Slugs[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Search/mpi_to_slug?mpi=${id}`)
      .pipe(map(response => response.data));
  }
}
