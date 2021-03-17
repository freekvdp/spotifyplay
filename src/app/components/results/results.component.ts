import { Component, Input, OnInit } from '@angular/core';
import { SpotifyResult } from '../../types';

@Component({
  selector: 'app-result-overview',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input()
  data: SpotifyResult;

  constructor() { }

  ngOnInit(): void {
  }

}
