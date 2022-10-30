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
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  Product,
  ProductVariant,
} from '@app/public-site/shop-product/product-page/product-page.component';
import { ProductOffer } from '@app/public-site/shop-category/compare-prices/compare-prices.component';
import {
  Category,
  CategoryProducts,
  ProductFilter,
} from '@app/public-site/shop-category/category-page/category-page.component';
import { LanguageService } from '@app/services/language/language.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface BackendResponse {
  data: any;
  message: string;
  status: 'failed' | 'success';
}

export interface UserState {
  lang_id: number;
  cart: any[];
  user_data: any;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  // eslint-disable-next-line no-magic-numbers
  public userState$: BehaviorSubject<UserState | null> =
    new BehaviorSubject<UserState | null>(null);
  private basePath = 'https://api.angular.appla.cy/';

  constructor(
    private http: HttpClient,
    private localizeRouterService: LocalizeRouterService,
    private languageService: LanguageService,
    private afAuth: AngularFireAuth
  ) {}

  public getSiteMenu(langId?: number): Observable<Menu[]> {
    let params = new HttpParams();
    if (langId) {
      params = params.set('lang_id', langId);
    }

    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Header/top_menu`, {
        withCredentials: true,
        params,
      })
      .pipe(map(response => response.data));
  }

  public getSlides(): Observable<Slide[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Home/home_slider_top`, {
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public getStoreOffers(): Observable<StoreOffers[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Home/get_store_offers`, {
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public getRecentlyViewed(): Observable<RecentlyViewed[]> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/get_recently_viewed`,
        { withCredentials: true }
      )
      .pipe(map(response => response.data));
  }

  public getTrends(): Observable<Trend[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Home/get_now_trending`, {
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public getSampleSmartphones(): Observable<ProductInTile[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Home/sample_smartphones`, {
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public getSampleKitchen(): Observable<ProductInTile[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Home/sample_kitchen`, {
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public getSamplePersonalCareProducts(): Observable<ProductInTile[]> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/sample_personal_care`,
        { withCredentials: true }
      )
      .pipe(map(response => response.data));
  }

  public getSampleCleaningProducts(): Observable<ProductInTile[]> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Home/sample_cleaning`, {
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public getAllProductCategories(
    limit: number,
    offset: number,
    order: string,
    slug: string,
    minPrice?: number | null,
    maxPrice?: number | null,
    searchQuery?: string | undefined,
    filters?: any[]
  ): Observable<CategoryProducts> {
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
    if (filters) {
      params = params.set('tech_detail', JSON.stringify(filters));
    }

    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Categories/get_category_products`,
        {
          params,
          withCredentials: true,
        }
      )
      .pipe(map(response => response.data));
  }

  public getProductFilters(slug: string): Observable<ProductFilter> {
    const params = new HttpParams().set('slug', slug);
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Categories/get_filters`, {
        params,
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public getCategory(categorySlug: string): Observable<Category> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Categories/get_categories/category?slug=${categorySlug}`,
        { withCredentials: true }
      )
      .pipe(map(response => response.data));
  }

  public getCategorySeo(slug: string) {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}/Angular/Categories/seo_data?slug=${slug}`,
        { withCredentials: true }
      )
      .pipe(map(response => response.data));
  }

  public getProductBySlug(
    storeSlug: string,
    productSlug: string
  ): Observable<Product> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Products/get_product?product_slug=${productSlug}&store_slug=${storeSlug}`,
        { withCredentials: true }
      )
      .pipe(map(response => response.data));
  }

  public searchInShop(
    query: string,
    limit?: number,
    offset?: number,
    category_slug?: string
  ): Observable<SearchResults> {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    if (category_slug) {
      params = params.set('category_slug', category_slug);
    }
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Search?string=${query}`, {
        params,
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public searchProducts(query: string): Observable<SearchResults> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Search?string=${query}`, {
        withCredentials: true,
      })
      .pipe(map(response => response.data));
  }

  public login(email: string, password: string): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(
      `${this.basePath}Angular/Auth/doSignin`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  public register(email: string): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(
      `${this.basePath}Angular/Auth/doSignup`,
      { email },
      { withCredentials: true }
    );
  }

  public isAuthorized(langId?: number): Observable<BackendResponse> {
    let params = new HttpParams();
    if (langId) {
      params = params.set('lang_id', langId);
    }
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Auth/checkAuth`, {
        withCredentials: true,
        params,
      })
      .pipe(tap(res => this.userState$.next(res.data)));
  }

  public logout(): Observable<BackendResponse> {
    return this.http
      .get<BackendResponse>(`${this.basePath}Angular/Auth/logout`, {
        withCredentials: true,
      })
      .pipe(tap(res => this.userState$.next(res.data)));
  }

  public getProductOffer(
    productSlug: string,
    masterProductId: number
  ): Observable<ProductOffer> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Compare/compare_product?slug=${productSlug}&mpi=${masterProductId}`,
        { withCredentials: true }
      )
      .pipe(map(response => response.data));
  }

  public getProductByMasterId(id: number): Observable<Slugs[]> {
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Search/mpi_to_slug?mpi=${id}`,
        { withCredentials: true }
      )
      .pipe(map(response => response.data));
  }

  public addToCart(
    qty: number,
    product_id: number,
    productVariant?: ProductVariant
  ): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(
      `${this.basePath}Angular/Cart/addToCart`,
      {
        qty,
        product_id,
        product_variant_id: productVariant?.product_variant_id,
      },
      { withCredentials: true }
    );
  }

  public followStore(merchant_id: number): Observable<string> {
    return this.http
      .post<BackendResponse>(
        `${this.basePath}Angular/Store/follow_merchant`,
        {
          merchant_id,
        },
        { withCredentials: true }
      )
      .pipe(map(response => response.data.msg));
  }

  public async signWithGoogle() {
    return await this.authLogin(new auth.GoogleAuthProvider()).catch(err =>
      console.log(err)
    );
  }

  public async signWithFacebook() {
    return await this.authLogin(new auth.FacebookAuthProvider()).catch(err =>
      console.log(err)
    );
  }

  public doGoogle(profile: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.basePath}Angular/Auth/doGoogle`,
        {
          profile,
        },
        { withCredentials: true }
      )
      .pipe(
        tap(res => {
          this.userState$.next(res.data);
        })
      );
  }

  public doFacebook(profile: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.basePath}Angular/Auth/doFacebook`,
        {
          profile,
        },
        { withCredentials: true }
      )
      .pipe(tap(res => this.userState$.next(res.data)));
  }

  private async authLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }
}
