import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.scss']
})
export class SlideBarComponent implements OnInit {
  isOpen = false;

  constructor(
    private themeService: ThemeService,
    private sideBarService: SideBarService,
  ) { }

  ngOnInit(): void {
    this.sideBarService.getSlideBarUpdates().subscribe(state => {
      this.isOpen = state === 'open' ? true : false;
    })
  }
  
  setTheme(themeName: string){
    this.themeService.setTheme(themeName);
  }
  previewTheme(themeName: string) {
    this.themeService.previewTheme(themeName);
  }
}
