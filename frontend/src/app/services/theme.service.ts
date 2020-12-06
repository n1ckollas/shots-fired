import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  ls = localStorage;
  defaultTheme = 'bootstrap4-dark-blue';
  currentTheme: string;
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
    this.currentTheme = this.availableThemes[themeName]
    this.ls.setItem('theme', this.currentTheme);
    const linkTag: any = document.getElementById('theme');
    linkTag.href = `assets/${this.currentTheme}/theme.css`;
    document.querySelector('body').className = `${this.currentTheme}-theme`;
  }

  previewTheme(themeName: string){
    
  }
}
