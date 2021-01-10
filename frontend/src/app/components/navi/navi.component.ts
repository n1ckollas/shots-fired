import { Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng-lts/api';
import { SideBarService } from '../../services/side-bar.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  items: MenuItem[];

  constructor(private sideBarService: SideBarService) { }


  ngOnInit() {
      this.items = [
        {
          label: 'Home',
          url:'/',
        },
        {
          label: 'Shootings', 
          url: 'shootings',
        },
        {
          label: 'Evictions', 
          url: 'evictions',
        },
        {
          label: 'Businesses Closed', 
          url: 'businesses-closed',
        }
      ];
  }

  openSideBar() {
    this.sideBarService.openSidebar();
  }
}
