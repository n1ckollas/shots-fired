import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info = []; 

  public options: any = {
    title: {
      text: 'Covid 19 statistics for the city of New York'
  },

  yAxis: {
      title: {
          text: 'Number of Employees'
      }
  },

  xAxis: {
      accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
      }
  },

  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },

  plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          pointStart: 2010
      }
  },

  series: [{
      name: 'Brooklyn',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
  }, {
      name: 'Bronx',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
  }, {
      name: 'Manhattan',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
  }, {
      name: 'Staten Island',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
  };

  
  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.getData();
    Highcharts.chart('container', this.options);
  }

  getData(){
    this.apiService.getData().subscribe(data => {
      for(let i = 0; i < data.length; i++){
        console.log(data[i]);
      }
    });
  }

}
