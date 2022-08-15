import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreOffers } from '@app/home/store-offers/store-offers.component';
import { RecentlyViewed } from '@app/shared/components/recently-viewed/recently-viewed.component';
import { Trend } from '@app/home/now-trending/now-trending.component';
import { ProductInTile } from '@app/home/product-category-tile/product-category-tile.component';
import { CategoryProduct } from '@app/shop-category/category-page/category-page.component';
import { Product } from '@app/shop-product/product-page/product-page.component';
import { Menu } from '@app/shared/components/header/navigation/navigation.component';
import { SearchResults } from '@app/search/search-results/search-results.component';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private basePath = 'https://stage.appla.cy/';

  constructor(private http: HttpClient) {}

  public getSiteMenu(): Observable<Menu[]> {
    return this.http.get<any>(`${this.basePath}menu`);
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

  public getCategoryProductsByCategoryId(
    categoryId: string,
    limit = 20,
    offset = 0
  ): Observable<CategoryProduct[]> {
    return this.http
      .get<CategoryProduct[]>(
        `${this.basePath}category-products/?id=${categoryId}&limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((result: CategoryProduct[]) => {
          return result.map(product => {
            product.picture = JSON.parse(product.picture);
            return product;
          });
        })
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
}
