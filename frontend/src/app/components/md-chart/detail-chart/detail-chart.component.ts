import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';


import * as Highcharts from 'highcharts';
import { ApiService } from 'src/app/services/api.service';
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
    @Input() data:any;
  detailChart: any;

  constructor(
      private chartService: ChartService,
      private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    this.apiService.getJson().subscribe(data => {
        this.renderChart(data);
    })
  }

  renderChart(apiData){

  Highcharts.chart('detail-container', {
        chart: {
            marginBottom: 120,
            reflow: false,
            marginLeft: 50,
            marginRight: 20,
            style: {
                position: 'absolute'
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Historical USD to EUR Exchange Rate',
            align: 'left'
        },
        subtitle: {
            text: 'Select an area by dragging across the lower chart',
            align: 'left'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: null
            },
            // maxZoom: 0.1
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 3
                        }
                    }
                }
            }
        },
        series: [
            { 
              type:'line',
              name: 'USD to EUR',
              pointStart: apiData[0][0],
              pointInterval: 24 * 3600 * 1000,
              data: [],
            }
      ],

        exporting: {
            enabled: false
        }

    }, (chart) => {
      console.log(chart);
      this.detailChart = chart;
      this.chartService.getDetailChart().next(chart);
    })
    
  }
}
