import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonIcon, SearchState } from '../../types';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.css']
})
export class MainButtonComponent {

  icon: ButtonIcon = 'not_started';
  currentState: SearchState;

  @Input()
  set state(currentState: SearchState) {
    this.currentState = currentState;
    this.setIcon(currentState);
  };

  @Output()
  clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  private setIcon(state: SearchState): void {
    switch (state) {
      case 'idle':
        this.icon = 'not_started';
        break;
      case 'listening':
        this.icon = 'mic';
        break;
      case 'ready':
        this.icon = 'thumb_up_alt';
        break;
      case 'searching':
        this.icon = 'location_searching';
        break;
      default:
        this.icon = 'not_started';
        return;
    }
  }
}
