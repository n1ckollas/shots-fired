import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private themeService: ThemeService) {}
  display = false;

  changeTheme(themeName: string){
    this.themeService.setTheme(themeName);
  }

  openBar(event): void{
    if(event === 'open'){
      this.display  = true;
    }
  }
  
}
