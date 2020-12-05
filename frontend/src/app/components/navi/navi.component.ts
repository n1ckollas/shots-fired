import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  items: MenuItem[];
  @Output() openEvent:  EventEmitter<string> = new EventEmitter();
  constructor() { }


  ngOnInit() {
      this.items = [
        {
          label: 'Home',
          url:'/',
        },
        {
          label: 'Death Count', 
          url: 'death-count',
        }
      ];
  }

  openSideBar() {
    console.log('hi')
    this.openEvent.emit('open')
  }
}
