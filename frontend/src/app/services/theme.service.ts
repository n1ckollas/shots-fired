import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  ls = localStorage;
  // defaultTheme = 'arya-blue';
  // defaultTheme = 'bootstrap4-light-blue';
  defaultTheme = 'bootstrap4-dark-blue';

  constructor() {
    this.setTheme(this.defaultTheme);
  }
  
  private getTheme(): string {
    return this.ls.getItem('theme') || this.defaultTheme;
  }

  setTheme(theme: string) {
    this.ls.setItem('theme', theme);
    const linkTag: any = document.getElementById('theme');
    linkTag.href = `assets/${theme}/theme.css`;
    document.querySelector('body').className = `${theme}-theme`;
  }
}
