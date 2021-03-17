import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { VOICE_SEARCH_TRIGGER } from '../assets/static';
import { SpotifyService } from '../api/spotify/spotify.service';
import { SpeechToTextService } from '../api/stt/speech-to-text.service';
import { delay, filter, map, tap } from 'rxjs/operators';
import { SearchState, SpotifyResult } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public state: BehaviorSubject<SearchState> = new BehaviorSubject<SearchState>('idle');

  private stateSubscription: Subscription;
  private sttValueSubscription: Subscription;

  public spotifyData: Observable<SpotifyResult>;

  public searchValue = '...';

  constructor(
    private spotify: SpotifyService,
    private stt: SpeechToTextService
  ) {
  }

  ngOnInit(): void {
    this.stt.init();
    this.handleStateChange();
    this.handleTranscriptChange();
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
    this.sttValueSubscription.unsubscribe();
  }

  public searchSpotify(): void {
    this.spotifyData = this.spotify.search(this.searchValue)
      .pipe(
        delay(400),
        tap(() => this.updateState('results')),
        map(({ artists, tracks, albums }) => ({ artists: artists.items, tracks: tracks.items, albums: albums.items })),
      );
  }

  public onButtonClick(): void {
    const currentState = this.state.getValue();

    switch (currentState) {
      case 'idle':
        this.updateState('listening');
        break;
      case 'listening':
        return;
      case 'ready':
        this.searchSpotify();
        this.updateState('searching');
        break;
      case 'searching':
        return;
      default:
        return;
    }
  }

  private updateState(newState: SearchState): void {
    if (newState && newState !== this.state.getValue()) {
      this.state.next(newState);
    }
  }

  private handleStateChange(): void {
    this.stateSubscription = this.state
      .pipe(filter(state => state === 'listening'))
      .subscribe(_ => this.stt.start()
      );
  }

  private handleTranscriptChange(): void {
    this.sttValueSubscription = this.stt.currentTranscriptValue
      .pipe(
        // filter(value => !!value),
        filter(value => value?.toLowerCase().startsWith(VOICE_SEARCH_TRIGGER)),
        tap(_ => this.stt.stop()),
        map(value => value.substring(VOICE_SEARCH_TRIGGER.length).trim())
      )
      .subscribe(searchValue => {
        if (searchValue.endsWith('now')) {
          searchValue = searchValue.split('now')[0].trim();
          this.searchValue = searchValue;
          this.searchSpotify();
          this.updateState('searching');
        } else {
          this.searchValue = searchValue;
          this.updateState('ready');
        }
      });
  }

  public reset(): void {
    this.searchValue = '...';
    this.state.next('idle');
    this.spotifyData = null;
  }
}
