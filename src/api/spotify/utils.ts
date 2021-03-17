import { HttpHeaders } from '@angular/common/http';
import { CLIENT_ID, CLIENT_SECRET } from '../../assets/static';

export class SpotifyServiceUtils {

  static makeAuthenticationHeaders(): HttpHeaders {
    const encodedClient = btoa(`${ CLIENT_ID }:${CLIENT_SECRET}`);

    return new HttpHeaders({
      Authorization: `Basic ${ encodedClient }`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  static makeSearchUrl(searchValue: string): string {
    const url = 'https://api.spotify.com/v1/search';
    const searchTypes = ['album', 'artist', 'track'].join(',');
    const encodedValue = encodeURIComponent(searchValue);

    return `${ url }?q=${ encodedValue }&type=${ searchTypes }`;
  }

  static makeQueryHeaders(token): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${ token }` });
  }
}
