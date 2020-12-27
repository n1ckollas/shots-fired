import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IChart {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class SimpleChartService {
  public options = {
    chart:{
      backgroundColor: null,
      style:{
        fontFamily:"Arial",
        color:"#000000"
      }
    },
    colors:["#ff0000", "#0000ff", "#ff1aff", "#ff9900", "#00cc00",
           "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
    
    title: {
      text: '',
      style: {
        color:'#000000',
      }
    },

    yAxis: {
      lineColor: '#000',
      lineWidth: 1, 
      tickWidth: 1,
      tickColor: '#000',
      labels: {
          style: {
            color: '#000',
            font: '12px Trebuchet MS, Verdana, sans-serif'
          }
      },
      title: {
        text: 'Number of Deaths',
        style: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif'
        }            
      }
    },

    xAxis: {
      categories: [],
      gridLineWidth: 0,
      lineColor: '#000',
      tickColor: '#000',
      labels: {
          style: {
            color: '#000',
            font: '12px Trebuchet MS, Verdana, sans-serif'
          }
      },
      title: {
          style: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

          }            
      }
    },

    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle:{
        color:"#333333",
        fontSize:"14px",
      }
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

  detailChart: BehaviorSubject<IChart> = new BehaviorSubject({})

  constructor() { }

  getOptions(){
    return this.options;
  }

  setDarkTheme(options){
    options.colors = ["#ff0000", "#00ffff", "#ff1aff", "#ffff00", "#00cc00",
                            "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
    options.yAxis.lineColor = '#cecece';
    options.yAxis.tickColor = '#cecece';
    options.yAxis.title.style.color = '#fff';
    options.yAxis.labels.style.color = '#fff';

    options.xAxis.lineColor = '#cecece';
    options.xAxis.tickColor = '#cecece';
    options.xAxis.labels.style.color = '#fff';


    options.legend.itemStyle.color = '#fff';
    return options;
  }

  setLightTheme(options){
    options.colors = ["#ff0000", "#0000ff", "#ff1aff", "#00e6e6", "#00cc00",
                            "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
    options.yAxis.lineColor = '#000';
    options.yAxis.tickColor = '#000';
    options.yAxis.labels.style.color = '#000';
    options.xAxis.lineColor = '#000';
    options.xAxis.tickColor = '#000';
    options.xAxis.labels.style.color = '#000';
    options.legend.itemStyle.color = '#000';
    return options;
  }

  getDetailChartUpdates(): Observable<IChart>{
    return this.detailChart.asObservable();
  }
  getDetailChart(): BehaviorSubject<IChart>{
    return this.detailChart;
  }
}
