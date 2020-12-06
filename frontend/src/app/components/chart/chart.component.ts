import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import * as Highcharts from 'highcharts';
import Dark from 'highcharts/themes/high-contrast-dark'
import Light from 'highcharts/themes/high-contrast-light'

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts)


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
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
  chart: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.darkTheme();
    this.apiService.getData().subscribe(data => {
        this.options.series = data.series;
        this.options.xAxis.categories = data.categories;       
        this.chart = Highcharts.chart('chart-container', this.options);
    });
  }

  darkTheme(): void{
    Dark(Highcharts);
  }

  lightTheme():void {
    Light(Highcharts);
  }
  reRenderChart(): void {
    Highcharts.chart('chart-container', this.options);
  }
}
