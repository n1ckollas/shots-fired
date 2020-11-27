import { Component, OnInit } from '@angular/core';
import { ApiService, IHomeScreenData } from 'src/app/services/api.service';

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

  public options: any = {
    title: {
      text: 'Covid 19 statistics for the city of New York'
  },

  yAxis: {
      title: {
          text: 'Number of Deaths'
      }
  },

  xAxis: {
      categories: [],
  },

  legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom'
  },

  series: [],

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

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  chart:any;

  
  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.apiService.getData().subscribe(data => {
        this.options.series = data.series;
        this.options.xAxis.categories = data.categories;       
        this.chart = Highcharts.chart('container', this.options);
    });
  }

}
