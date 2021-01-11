import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ISimpleChartData {
  categories: string[];
  series: object[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getDeathCountForAllBoroughs(){
   return this.http.get<ISimpleChartData>("http://localhost:8000/all-dc/").pipe(
    //  tap((data) => console.log(data)),
     catchError((error) => {
       const result:ISimpleChartData = {
         categories: [],
         series: [],
       }
        return of(result);
      })
    )
  }

  getDeathcountForBk(){
    const url = "http://localhost:8000/all-cases/"
    return this.http.get<{}>(url).pipe(
      // tap((data) => console.log(data)),
      catchError((error) => {
         return of([]);
       })
     )
  }
  getShootings(){
    const url = "http://localhost:8000/shootings"
    return this.http.get<[]>(url).pipe(
      // tap((data) => console.log(data)),
      catchError((error) => {
         return of([]);
       })
     )
  }

  getShootingsPerDate(date: number){
    const url = "http://localhost:8000/shootings?date="+ date;
    return this.http.get<[]>(url).pipe(
      tap((data) => console.log(data)),
      catchError((error) => {
         return of([]);
       })
     )
  }
}
