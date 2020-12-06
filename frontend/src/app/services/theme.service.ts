import { Injectable } from '@angular/core';

export interface Theme {
  name:string;
  path:string;
  isCurrent:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  ls = localStorage;
  currentTheme: string;
  availableThemes: Theme[] = [
    {
      name:'Bootstrap Dark Theme', 
      path:'bootstrap4-dark-blue',
      isCurrent: true,
    }, 
    {
      name:'Bootstrap Light Theme',
      path:'bootstrap4-light-blue',
      isCurrent: false,
    }, 
    {
      name:'Arya Blue Theme',
      path:'arya-blue',
      isCurrent: false,
    }
  ]
  constructor() {
    this.setTheme(this.availableThemes[0].path);
  }
  
  private getTheme(): string {
    return this.ls.getItem('theme') || this.availableThemes[0].path;
  }

  setTheme(themeName: string) {
    this.currentTheme = themeName;
    this.ls.setItem('theme', this.currentTheme);
    this.replaceStyleSheet(this.currentTheme);

    this.availableThemes.forEach(theme => {
      if(theme.path === this.currentTheme){
        theme.isCurrent = true;
      } else {
        theme.isCurrent = false;
      }
    })
  }

  previewTheme(themeName: string){
    this.replaceStyleSheet(themeName);
  }

  getAvailableThemes(): Theme[]{
    return this.availableThemes;
  }

  revertToCurrent(): void {
    this.replaceStyleSheet(this.currentTheme);
  }

  replaceStyleSheet(value: string): void {
    const linkTag: any = document.getElementById('theme');
    linkTag.href = `assets/${value}/theme.css`;
    document.querySelector('body').className = `${value}-theme`;
  }
}
