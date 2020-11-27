import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IHomeScreenData {
  categories: string[];
  series: object[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getData(){
   return this.http.get<IHomeScreenData>("http://localhost:8000").pipe(
     catchError((error) => {
       const result:IHomeScreenData = {
         categories: [],
         series: [],
       }
        return of(result);
      })
    )
  }
}
