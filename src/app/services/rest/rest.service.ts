import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trend } from '@app/public-site/now-trending/now-trending.component';
import { ProductInTile } from '@app/public-site/product-category-tile/product-category-tile.component';
import { StoreOffers } from '@app/public-site/store-offers/store-offers.component';
import { SearchResults } from '@app/search/search-results/search-results.component';
import { Menu } from '@app/shared/components/header/navigation/navigation.component';
import { AuthStatus } from '@app/shared/components/modal/login/login.component';
import { RecentlyViewed } from '@app/shared/components/recently-viewed/recently-viewed.component';
import { Slide } from '@app/shared/components/slider/slider.component';
import { makeRelativePath } from '@app/shared/utils/functions';
import { Category } from '@app/shop-category/category-page/category-page.component';
import { map, Observable } from 'rxjs';
import { Product } from '@app/shop-product/product-page/product-page.component';

interface BackendResponse {
  data: any;
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private basePath = 'https://stage.appla.cy/Angular/';

  constructor(private http: HttpClient) {}

  public getSiteMenu(): Observable<Menu[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Header/top_menu`)
      .pipe(map(response => response.data));
  }

  public getSlides(): Observable<Slide[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Home/home_slider_top`)
      .pipe(
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

  public getAllCategories(
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
      .pipe(map(response => response.data));
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

  public login(email: string, password: string): Observable<AuthStatus> {
    return this.http.get<AuthStatus>(
      `${this.basePath}login?email=${email}&password=${password}`
    );
  }

  public getProductOffer(productSlug: string, masterProductId: number) {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Compare/compare_product?slug=${productSlug}&mpi=${masterProductId}`
      )
      .pipe(map(response => response.data));
  }
}
