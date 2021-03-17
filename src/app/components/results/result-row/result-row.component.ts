import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.css']
})
export class ResultRowComponent {

  @Input()
  rowData: any;

  @Input()
  dataType: 'album' | 'artist' | 'track';

  constructor() { }
}
