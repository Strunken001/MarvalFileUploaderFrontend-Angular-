import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  enabled = false;
  queue = [];
  @Input() delay = 500;

  constructor() { }

  ngOnInit(){
    
  }

}
