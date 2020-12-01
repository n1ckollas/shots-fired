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
          },
          {
              label: 'Death Count', 
              icon: 'pi pi-fw pi-pencil',
              url: 'death-count',
          }
      ];
    }
}
