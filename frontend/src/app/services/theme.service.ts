import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  ls = localStorage;
  // defaultTheme = 'arya-blue';
  // defaultTheme = 'bootstrap4-light-blue';
  defaultTheme = 'bootstrap4-dark-blue';
  availableThemes = {
    default : 'bootstrap4-dark-blue',
    light : 'bootstrap4-light-blue',
    arya : 'arya-blue'
  }

  constructor() {
    this.setTheme('default');
  }
  
  private getTheme(): string {
    return this.ls.getItem('theme') || this.defaultTheme;
  }

  setTheme(themeName: string) {
    const theme = this.availableThemes[themeName]
    this.ls.setItem('theme', theme);
    const linkTag: any = document.getElementById('theme');
    linkTag.href = `assets/${theme}/theme.css`;
    document.querySelector('body').className = `${theme}-theme`;
  }
}
