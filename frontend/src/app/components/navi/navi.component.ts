import { Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
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
          url: 'death-count',
        },
        {
          label: 'Evictions', 
          url: 'death-count',
        },
        {
          label: 'Businesses Closed', 
          url: 'death-count',
        }
      ];
  }

  openSideBar() {
    this.sideBarService.openSidebar();
  }
}
