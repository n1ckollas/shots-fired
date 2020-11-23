import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info = []; 
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.apiService.getData().subscribe(data => console.log(data));
  }

}
