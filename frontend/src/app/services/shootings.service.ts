import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShootingsService {

  pointTimeStamp: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor() { }

  getPointStamp(): BehaviorSubject<number> {
    return this.pointTimeStamp;
  }
  getStampUpdates(): Observable<number> {
    return this.pointTimeStamp.asObservable();
  }
}
