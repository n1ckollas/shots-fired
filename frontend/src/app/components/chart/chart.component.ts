import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';


import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chart.service';
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

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService,
    private chartService: ChartService,
  ) { }

  ngOnInit(): void {
    this.options = this.chartService.getOptions();
    this.getData();
    this.themeService.getChartThemeUpdates().subscribe(theme => {
      theme === 'light' ? this.lightTheme() : this.darkTheme();
    })
  }

  getData(){
    console.log("getData")
    this.apiService.getData().subscribe(data => {
        this.options.series = data.series;
        this.options.xAxis.categories = data.categories;       
        this.chart = Highcharts.chart('chart-container', this.options);
        console.log(this.chart);
        

    });
  }

  darkTheme(): void{
    console.log('Dark')
    const options = this.chartService.setDarkTheme()
    this.reRenderChart(options);
  }

  lightTheme():void {
    console.log('Light')
    const options = this.chartService.setLightTheme();
    this.reRenderChart(options);
  }
  reRenderChart(options:any): void {
    Highcharts.chart('chart-container', options);
  }
}
