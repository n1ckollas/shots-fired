import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


import * as Highcharts from 'highcharts';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-md-chart',
  templateUrl: './md-chart.component.html',
  styleUrls: ['./md-chart.component.scss']
})
export class MdChartComponent implements OnInit {
  
  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
  }


}
