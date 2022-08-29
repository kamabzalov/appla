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

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private basePath = 'https://stage.appla.cy/';

  constructor(private http: HttpClient) {}

  public getSiteMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.basePath}menu`);
  }

  public getSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>(`${this.basePath}home-slider-top`).pipe(
      map((slides: Slide[]) => {
        return slides.map(item => ({
          ...item,
          link: makeRelativePath(item.link),
        }));
      })
    );
  }

  public getStoreOffers(): Observable<StoreOffers[]> {
    return this.http.get<StoreOffers[]>(`${this.basePath}store-offers`);
  }

  public getRecentlyViewed(): Observable<RecentlyViewed[]> {
    return this.http.get<RecentlyViewed[]>(
      `${this.basePath}recently?store_id=false&user_id=&name=name1`
    );
  }

  public getTrends(): Observable<Trend[]> {
    return this.http.get<Trend[]>(`${this.basePath}trending`);
  }

  public getSampleSmartphones(): Observable<ProductInTile[]> {
    return this.http.get<ProductInTile[]>(`${this.basePath}sample-smartphones`);
  }

  public getSampleKitchen(): Observable<ProductInTile[]> {
    return this.http.get<ProductInTile[]>(`${this.basePath}sample-kitchen`);
  }

  public getSamplePersonalCareProducts(): Observable<ProductInTile[]> {
    return this.http.get<ProductInTile[]>(
      `${this.basePath}sample-personal-care`
    );
  }

  public getSampleCleaningProducts(): Observable<ProductInTile[]> {
    return this.http.get<ProductInTile[]>(`${this.basePath}sample-cleaning`);
  }

  public getAllCategories(
    limit: number,
    offset: number,
    order: string,
    slug: string,
    minPrice?: number,
    maxPrice?: number
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
    return this.http.get<Category>(`${this.basePath}category-products`, {
      params,
    });
  }

  public getProductBySlug(
    storeSlug: string,
    productSlug: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.basePath}product?product_slug=${productSlug}&slug_store=${storeSlug}`
    );
  }

  public searchInShop(query: string): Observable<SearchResults> {
    return this.http.get<SearchResults>(
      `${this.basePath}search?string=${query}`
    );
  }

  public login(email: string, password: string): Observable<AuthStatus> {
    return this.http.get<AuthStatus>(
      `${this.basePath}login?email=${email}&password=${password}`
    );
  }

  public getProductOffer(productSlug: string, masterProductId: number) {
    return this.http.get<any>(
      `${this.basePath}product-offers?slug=${productSlug}?mpi=${masterProductId}`
    );
  }
}
