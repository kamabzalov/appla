import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private basePath = 'https://stage.appla.cy/';

  constructor(private http: HttpClient) {
  }

  getSiteMenu(): Observable<any> {
    return this.http.get<any>(`${this.basePath}menu`);
  }

}
