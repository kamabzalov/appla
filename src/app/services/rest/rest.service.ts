import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreOffers } from '@app/public-site/store-offers/store-offers.component';
import { RecentlyViewed } from '@app/shared/components/recently-viewed/recently-viewed.component';
import { Trend } from '@app/public-site/now-trending/now-trending.component';
import { ProductInTile } from '@app/public-site/product-category-tile/product-category-tile.component';
import { Category } from '@app/shop-category/category-page/category-page.component';
import { Product } from '@app/shop-product/product-page/product-page.component';
import { Menu } from '@app/shared/components/header/navigation/navigation.component';
import { SearchResults } from '@app/search/search-results/search-results.component';
import { AuthStatus } from '@app/shared/components/modal/login/login.component';
import { Slide } from '@app/shared/components/slider/slider.component';

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
        return slides;
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

  public getAllCategories(): Observable<Category[]> {
    return of([]);
  }

  public getCategoryProductsByCategoryId(
    categoryId: string,
    limit = 20,
    offset = 0
  ): Observable<Category> {
    return this.http.get<Category>(
      `${this.basePath}category-products/?id=${categoryId}&limit=${limit}&offset=${offset}`
    );
  }

  public getProductById(productId: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}product?id=${productId}`).pipe(
      map((result: Product) => {
        result.picture = JSON.parse(result.picture);
        return result;
      })
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
}
