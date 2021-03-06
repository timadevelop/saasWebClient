import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { GeoSearchResult } from '../models/GeoSearchResult';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '../models/Location.model';
import { PaginatedApiResponse } from '../models/api-response/paginated-api-response';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(
    private http: HttpClient) {
  }

  @Cacheable()
  public getById(id: number | string): Observable<Location> {
    return this.http.get<Location>(`${environment.apiUrl}/locations/${id}/`);
  }


  @Cacheable({
    maxAge: 100 * 1000
  })
  public searchGeo(query: string): Observable<Array<GeoSearchResult>> {
    return this.http.get<Array<GeoSearchResult>>(`${environment.apiUrl}/locations/geo/${query}/`);
  }

  @Cacheable()
  public getMajorCities(): Observable<PaginatedApiResponse<Location>> {
    return this.http.get<PaginatedApiResponse<Location>>(`${environment.apiUrl}/locations/major/`);
  }

  @Cacheable({
    maxAge: 100 * 1000
  })
  public search(query: string): Observable<PaginatedApiResponse<Location>> {
    return this.http.get<PaginatedApiResponse<Location>>(`${environment.apiUrl}/locations/?search=${query}`);
  }

  @Cacheable({
    maxAge: 100 * 1000
  })
  public getNext(nextUrl: string): Observable<PaginatedApiResponse<Location>> {
    return this.http.get<PaginatedApiResponse<Location>>(nextUrl);
  }
}
