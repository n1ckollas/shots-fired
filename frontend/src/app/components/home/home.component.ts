import { Component, OnInit } from '@angular/core';
import { ApiService, IHomeScreenData } from 'src/app/services/api.service';

import * as Highcharts from 'highcharts';
import darkBlue from 'highcharts/themes/dark-blue'
import darkUnica from 'highcharts/themes/dark-unica'

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public options: any = {
    title: {
      text: ''
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
  chart;

  
  constructor(private apiService: ApiService) { }

  ngOnInit(){
      this.getData();
  }

  getData(){
    // darkBlue(Highcharts);
    darkUnica(Highcharts);
    this.apiService.getData().subscribe(data => {
        this.options.series = data.series;
        this.options.xAxis.categories = data.categories;       
        this.chart = Highcharts.chart('chart-container', this.options);
    });
  }

}
