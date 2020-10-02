import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selectedFeatureEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    //TODO: code goes here when this object is created
  }

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }

}
