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
  CurrentCategory,
  ProductFilter,
  Subcategory,
} from '@app/public-site/shop-category/category-page/category-page.component';
import { AppLanguages } from '@app/services/language/language.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface BackendResponse {
  data: any;
  message: string;
  status: string;
}

interface FirebaseResponse {
  additionalUserInfo: any;
  credential: any;
  operationType: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private basePath = 'https://stage.appla.cy/';

  constructor(
    private http: HttpClient,
    private localizeRouterService: LocalizeRouterService,
    public afAuth: AngularFireAuth
  ) {}

  public getSiteMenu(): Observable<Menu[]> {
    const langId = this.getLangId();
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
    const langId = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/get_store_offers?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getRecentlyViewed(): Observable<RecentlyViewed[]> {
    const langId = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/get_recently_viewed?store_id=false&user_id=&name=name1&lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getTrends(): Observable<Trend[]> {
    const langId = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/get_now_trending?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSampleSmartphones(): Observable<ProductInTile[]> {
    const langId = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/sample_smartphones?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSampleKitchen(): Observable<ProductInTile[]> {
    const langId = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/sample_kitchen?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSamplePersonalCareProducts(): Observable<ProductInTile[]> {
    const langId = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Home/sample_personal_care?lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public getSampleCleaningProducts(): Observable<ProductInTile[]> {
    const langId = this.getLangId();
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
    const langId = this.getLangId();
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
          response.data.subcategories.map((item: Subcategory) => {
            return item.name.replace('&amp;', '&');
          });
          if (response.data.this_category?.name) {
            (response.data.this_category as CurrentCategory).name = (
              response.data.this_category as CurrentCategory
            ).name.replace('&amp;', '&');
          }

          return response.data;
        })
      );
  }

  public getProductBySlug(
    storeSlug: string,
    productSlug: string
  ): Observable<Product> {
    const langId = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Products/get_product?product_slug=${productSlug}&store_slug=${storeSlug}&lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public searchInShop(
    query: string,
    limit?: number,
    offset?: number,
    category_slug?: string
  ): Observable<SearchResults> {
    const langId = this.getLangId();
    let params = new HttpParams().set('lang_id', langId);
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
      })
      .pipe(map(response => response.data));
  }

  public searchProducts(query: string): Observable<SearchResults> {
    const langId = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Search?string=${query}&lang_id=${langId}`
      )
      .pipe(map(response => response.data));
  }

  public login(email: string, password: string): Observable<BackendResponse> {
    const lang_id = this.getLangId();
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
    const lang_id = this.getLangId();
    return this.http.post<BackendResponse>(
      `${this.basePath}Angular/Auth/doSignup`,
      { email, lang_id }
    );
  }

  public isAuthorized(): Observable<BackendResponse> {
    return this.http.get<BackendResponse>(
      `${this.basePath}Angular/Auth/checkAuth`,
      { withCredentials: true }
    );
  }

  public logout(): Observable<BackendResponse> {
    const lang_id = this.getLangId();
    return this.http.get<BackendResponse>(
      `${this.basePath}logout?lang_id=${lang_id}`
    );
  }

  public getProductOffer(
    productSlug: string,
    masterProductId: number
  ): Observable<ProductOffer> {
    const lang_id = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Compare/compare_product?slug=${productSlug}&mpi=${masterProductId}&lang_id=${lang_id}`
      )
      .pipe(map(response => response.data));
  }

  public getProductByMasterId(id: number): Observable<Slugs[]> {
    const lang_id = this.getLangId();
    return this.http
      .get<BackendResponse>(
        `${this.basePath}Angular/Search/mpi_to_slug?mpi=${id}&lang_id=${lang_id}`
      )
      .pipe(map(response => response.data));
  }

  public addToCart(
    qty: number,
    product_id: number
  ): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(
      `${this.basePath}Angular/Cart/addToCart`,
      {
        qty,
        product_id,
      }
    );
  }

  public followStore(
    // eslint-disable-next-line no-magic-numbers
    user_id: number = 1,
    // eslint-disable-next-line no-magic-numbers
    merchant_id: number = 1
  ): Observable<string> {
    return this.http
      .post<BackendResponse>(`${this.basePath}Angular/Store/follow_merchant`, {
        user_id,
        merchant_id,
      })
      .pipe(map(response => response.data.msg));
  }

  public async signWithGoogle() {
    return await this.authLogin(new auth.GoogleAuthProvider());
  }

  public async signWithFacebook() {
    return await this.authLogin(new auth.FacebookAuthProvider());
  }

  public doGoogle(profile: any): Observable<any> {
    return this.http.post<any>(`${this.basePath}Angular/Auth/doGoogle`, {
      profile,
    });
  }

  public doFacebook(profile: any) {
    return this.http.post(`${this.basePath}Angular/Auth/doFacebook`, {
      profile,
    });
  }

  private async authLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }

  private getLangId(): number {
    const lang = AppLanguages.find(
      lang => lang.code === this.localizeRouterService.parser.currentLang
    );
    if (lang) {
      return lang.id;
    }
    return AppLanguages.find(lang => lang.code === 'el')!.id;
  }
}
