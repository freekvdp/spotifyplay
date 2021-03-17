import { Component, Input } from '@angular/core';
import { SearchState } from '../../types';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input()
  state: SearchState;

  @Input()
  searchValue: string;

}
