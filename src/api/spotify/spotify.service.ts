import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { SpotifyServiceUtils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  private authenticate(): Observable<string> {
    const url = 'https://accounts.spotify.com/api/token';
    const body = 'grant_type=client_credentials';

    return this.http.post(url, body, { headers: SpotifyServiceUtils.makeAuthenticationHeaders() })
      .pipe(
        map((response: { access_token: string }) => response.access_token)
      );
  }

  public search(searchValue): Observable<any> {
    return this.authenticate()
      .pipe(
        map(token => SpotifyServiceUtils.makeQueryHeaders(token)),
        withLatestFrom(of(SpotifyServiceUtils.makeSearchUrl(searchValue))),
        mergeMap(([headers, url]) => this.http.get(url, { headers })),
      );
  }
}
