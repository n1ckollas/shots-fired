import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Theme {
  name:string;
  path:string;
  isCurrent:boolean;
  chartTheme:string;
}
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  ls = localStorage;
  currentTheme: Theme;
  availableThemes: Theme[] = [
    {
      name:'Dark Theme', 
      path:'bootstrap4-dark-blue',
      isCurrent: true,
      chartTheme: 'dark',
    }, 
    {
      name:'Light Theme',
      path:'bootstrap4-light-blue',
      isCurrent: false,
      chartTheme: 'light',
    }, 
  ]
  chartThemeUpdates: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    const theme = this.getTheme();
    this.setTheme(theme);
  }
  
  private getTheme(): string {
    return this.ls.getItem('theme') || this.availableThemes[0].path;
  }

  setTheme(themePath: string) {
     this.availableThemes.forEach(theme => {
      if(theme.path === themePath){
        this.currentTheme = theme;
        theme.isCurrent = true;
      } else {
        theme.isCurrent = false;
      }
    });

    this.ls.setItem('theme', this.currentTheme.path);
    this.replaceStyleSheet(this.currentTheme.path);
    this.chartThemeUpdates.next(this.currentTheme.chartTheme)
  }

  getAvailableThemes(): Theme[]{
    return this.availableThemes;
  }

  getChartThemeUpdates(): Observable<string> {
    return this.chartThemeUpdates.asObservable();
  }

  replaceStyleSheet(value: string): void {
    this.ls.setItem('theme', value);
    const linkTag: any = document.getElementById('theme');
    linkTag.href = `assets/${value}/theme.css`;
    document.querySelector('body').className = `${value}-theme`;
  }
}
