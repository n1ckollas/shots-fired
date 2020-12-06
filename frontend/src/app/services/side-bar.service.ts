import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  sideBarState: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  openSidebar(){
    this.sideBarState.next('open');
  }

  getSlideBarUpdates(){
   return this.sideBarState.asObservable();
  }

}
