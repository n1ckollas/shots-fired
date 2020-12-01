import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              url:'/',
              icon: 'pi pi-home'
          },
          {
              label: 'Death Count', 
              icon: 'pi pi-user-minus',
              url: 'death-count',
          }
      ];
    }
}
