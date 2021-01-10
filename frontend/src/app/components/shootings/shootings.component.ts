import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';
import { SimpleChartService } from 'src/app/services/chart.service';


import * as Highcharts from 'highcharts';
import { ShootingsService } from 'src/app/services/shootings.service';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts)

@Component({
  selector: 'app-shootings',
  templateUrl: './shootings.component.html',
  styleUrls: ['./shootings.component.scss']
})
export class ShootingsComponent implements OnInit {
  options: any; 
  chart: any;
  detailContainer = "shootings-container"

  mapOptions: any;
  overlays: any[];

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService,
    private chartService: SimpleChartService,
    private shootings: ShootingsService,
  ) { }
  ngOnInit(): void {
    this.options = this.chartService.getOptions();
    this.getData();
    this.themeService.getChartThemeUpdates().subscribe(theme => {
      theme === 'light' ? this.lightTheme() : this.darkTheme();
    })

    this.mapOptions = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };

    this.shootings.getStampUpdates().subscribe(stamp => {
      if(stamp != null && stamp != undefined){
        this.apiService.getShootingsPerDate(stamp).subscribe();
      }
    })
  }

  getData(){
    this.apiService.getShootings().subscribe(data => {
      const pointStamp = this.shootings.getPointStamp();
      let incedents = { 
        type:'line',
        name: 'Shootings',
        pointStart: data[0][0],
        pointInterval: 24 * 3600 * 1000,
        data: data,
      }
      this.options.xAxis.type = 'datetime';
      this.options.xAxis.categories = null;
      this.options.plotOptions =  {
        series: {
          point: {
              events: {
                  click: function() {
                    pointStamp.next(this.x);
                  }
              }
          }
        }
     },
      this.options.series.push(incedents);
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
