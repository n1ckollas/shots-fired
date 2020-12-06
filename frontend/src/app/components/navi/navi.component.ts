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
          label: 'Death Count', 
          url: 'death-count',
        }
      ];
  }

  openSideBar() {
    this.sideBarService.openSidebar();
  }
}
