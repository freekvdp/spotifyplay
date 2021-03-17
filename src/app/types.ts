export interface SpotifyResult {
  artists: Array<any>;
  tracks: Array<any>;
  albums: Array<any>;
}

export type SearchState = 'listening' | 'ready' | 'searching' | 'results' | 'idle';
export type ButtonIcon = 'not_started' | 'mic' | 'thumb_up_alt' | 'location_searching';
