import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords;

  public currentTranscriptValue = new Subject<string>();

  constructor() {
  }

  init(): void {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start(): void {
    this.currentTranscriptValue.next('');
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log('Speech recognition started');
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log('End speech recognition');
      } else {
        this.currentTranscriptValue.next(this.tempWords);
        this.wordConcat();
        this.recognition.start();
      }
    });
  }

  stop(): void {
    this.isStoppedSpeechRecog = true;
    this.recognition.stop();
    console.log('End speech recognition (stop)');
  }

  wordConcat(): void {
    this.tempWords = '';
  }
}
