import { Component, Input, OnInit } from '@angular/core';
import { SimpleChartService } from 'src/app/services/chart.service';
import { ApiService } from 'src/app/services/api.service';

import * as Highcharts from 'highcharts';
import { Theme, ThemeService } from 'src/app/services/theme.service';
import { DetailChartService } from 'src/app/services/detail-chart.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-detail-chart',
  templateUrl: './detail-chart.component.html',
  styleUrls: ['./detail-chart.component.scss']
})
export class DetailChartComponent implements OnInit {
    detailChart: any;
    detailContainer = 'detail-container';
    options = {} 


 
    constructor(
      private chartService: SimpleChartService,
      private detailChartService: DetailChartService,
      private apiService: ApiService,
      private themeService: ThemeService,
    ) { }

  ngOnInit(): void {
    this.options = this.detailChartService.getDetailChartOptions();

    this.apiService.getDeathcountForBk().subscribe(data => {
        this.renderChart(data, this.options);
    });

    this.themeService.getChartThemeUpdates().subscribe(theme => {
      theme === 'light' ? this.lightTheme() : this.darkTheme();
    });
  }

  renderChart(apiData, options){
    let item = { 
              type:'line',
              name: 'Deaths',
              pointStart: apiData[0][0],
              pointInterval: 24 * 3600 * 1000,
              data: apiData,
            }
    
    options.series.push(item);

    Highcharts.chart(this.detailContainer, options, (chart) => {
      this.detailChart = chart;
      this.chartService.getDetailChart().next(chart);
    })
    
  }

  darkTheme(): void{
    const options = this.chartService.setDarkTheme(this.options);
    this.reRenderChart(options);
  }

  lightTheme():void {
    const options = this.chartService.setLightTheme(this.options);
    this.reRenderChart(options);
  }

  reRenderChart(options:any): void {
    this.detailChart = Highcharts.chart(this.detailContainer, options);
    this.chartService.getDetailChart().next(this.detailChart);
  }
}
