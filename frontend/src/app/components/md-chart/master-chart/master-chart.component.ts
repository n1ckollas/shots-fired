import { Component, Input, OnInit } from '@angular/core';


import * as Highcharts from 'highcharts';
import { ApiService } from 'src/app/services/api.service';
import { ChartService } from 'src/app/services/chart.service';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);



@Component({
  selector: 'app-master-chart',
  templateUrl: './master-chart.component.html',
  styleUrls: ['./master-chart.component.scss']
})
export class MasterChartComponent implements OnInit {
  @Input() data;

  constructor(
    private chartService: ChartService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getJson().subscribe(data => {
      this.renderChart(data);
    })
  }

  renderChart(data){

    const detailChartUpdates = this.chartService.getDetailChartUpdates();
    let detailStart;

    Highcharts.chart('master-container', {
      chart: {
          reflow: false,
          borderWidth: 0,
          backgroundColor: null,
          marginLeft: 50,
          marginRight: 20,
          zoomType: 'x',
          events: {

              // listen to the selection event on the master chart to update the
              // extremes of the detail chart
              selection: function (event) {
                  var extremesObject = event.xAxis[0],
                      min = extremesObject.min,
                      max = extremesObject.max,
                      detailData = [],
                      xAxis = this.xAxis[0];

                  // reverse engineer the last part of the data
                  this.series[0].data.forEach(point => {
                      if (point.x > min && point.x < max) {
                          detailData.push([point.x, point.y]);
                      }
                  });

                  // move the plot bands to reflect the new detail span
                  xAxis.removePlotBand('mask-before');
                  xAxis.addPlotBand({
                      id: 'mask-before',
                      from: data[0][0],
                      to: min,
                      color: 'rgba(0, 0, 0, 0.2)'
                  });

                  xAxis.removePlotBand('mask-after');
                  xAxis.addPlotBand({
                      id: 'mask-after',
                      from: max,
                      to: data[data.length - 1][0],
                      color: 'rgba(0, 0, 0, 0.2)'
                  });

                  detailChartUpdates.subscribe(chart => {
                    // const s = 
                    // {
                    //   name: 'USD to EUR',
                    //   pointStart: detailStart,
                    //   pointInterval: 24 * 3600 * 1000,
                    //   data: detailData
                    // }
                    // chart.series.push(s);
                    chart.series[0].setData(detailData)
                  })

                  return false;
              }
          }
      },
      title: {
          text: null
      },
      accessibility: {
          enabled: false
      },
      xAxis: [{
          type: 'datetime',
          // showLastTickLabel: null,
          // maxZoom: 14 * 24 * 3600000, // fourteen days
          plotBands: [{
              id: 'mask-before',
              from: data[0][0],
              to: data[data.length - 1][0],
              color: 'rgba(0, 0, 0, 0.2)'
          }],
          title: {
              text: null
          }
      }],
      yAxis: {
          gridLineWidth: 0,
          labels: {
              enabled: false
          },
          title: {
              text: null
          },
          min: 0.6,
          showFirstLabel: false
      },
      tooltip: {
          formatter: function () {
              return false;
          }
      },
      legend: {
          enabled: false
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          series: {
              lineWidth: 1,
              marker: {
                  enabled: false
              },
              shadow: false,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              enableMouseTracking: false
          }
      },

      series: [{
          type: 'area',
          name: 'USD to EUR',
          pointInterval: 24 * 3600 * 1000,
          pointStart: data[0][0],
          data: data
      }],

      exporting: {
          enabled: false
      }

  }, masterChart => {
      
    // prepare the detail chart
    var detailData = [],
    detailStart = data[0][0];

    masterChart.series[0].data.forEach(point => {
      if (point.x >= detailStart) {
          detailData.push(point.y);
      }
    });
    
  }); // return chart instance

  }

}
