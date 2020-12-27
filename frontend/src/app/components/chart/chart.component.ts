import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { SimpleChartService } from 'src/app/services/chart.service';


import * as Highcharts from 'highcharts';
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
  options: any; 
  chart: any;
  detailContainer = "chart-container"

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService,
    private chartService: SimpleChartService,
  ) { }

  ngOnInit(): void {
    this.options = this.chartService.getOptions();
    this.getData();
    this.themeService.getChartThemeUpdates().subscribe(theme => {
      theme === 'light' ? this.lightTheme() : this.darkTheme();
    })
  }

  getData(){
    this.apiService.getDeathCountForAllBoroughs().subscribe(data => {
      this.options.series = data.series;
      this.options.xAxis.categories = data.categories;       
      this.chart = Highcharts.chart(this.detailContainer, this.options);
    });
  }

  darkTheme(): void{
    const options = this.chartService.setDarkTheme(this.options)
    this.reRenderChart(options);
  }

  lightTheme():void {
    const options = this.chartService.setLightTheme(this.options);
    this.reRenderChart(options);
  }
  reRenderChart(options:any): void {
    Highcharts.chart(this.detailContainer, options);
  }

}
