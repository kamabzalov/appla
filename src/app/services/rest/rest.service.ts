import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreOffers } from '@app/home/store-offers/store-offers.component';
import { RecentlyViewed } from '@app/home/recently-viewed/recently-viewed.component';
import { Trend } from '@app/home/now-trending/now-trending.component';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private basePath = 'https://stage.appla.cy/';

  constructor(private http: HttpClient) {}

  public getSiteMenu(): Observable<any> {
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
}
