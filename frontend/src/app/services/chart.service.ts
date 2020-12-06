import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public options: any = {
    chart:{
      backgroundColor: "#ffffff",
      style:{
        fontFamily:"Arial",
        color:"#000000"
      }
    },
    colors:["#ff0000", "#0000ff", "#ff1aff", "#ff9900", "#00cc00",
           "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
    
    title: {
        text: '',
        color:'#000000',
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
  constructor() { }

  getOptions(){
    return this.options;
  }

  setDarkTheme(){
    this.options.chart.backgroundColor = "#2a323d";
    this.options.colors = ["#ff0000", "#00ffff", "#ff1aff", "#ffff00", "#00cc00",
                            "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
    this.options.yAxis.lineColor = '#cecece';
    this.options.yAxis.tickColor = '#cecece';
    this.options.yAxis.title.style.color = '#fff';
    this.options.yAxis.labels.style.color = '#fff';

    this.options.xAxis.lineColor = '#cecece';
    this.options.xAxis.tickColor = '#cecece';
    this.options.xAxis.labels.style.color = '#fff';

    this.options.legend.itemStyle.color = '#fff';
    return this.options;
  }

  setLightTheme(){
    this.options.chart.backgroundColor = "#ffffff";
    this.options.colors = ["#ff0000", "#0000ff", "#ff1aff", "#00e6e6", "#00cc00",
                            "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
    this.options.yAxis.lineColor = '#000';
    this.options.yAxis.tickColor = '#000';
    this.options.yAxis.labels.style.color = '#000';
    this.options.xAxis.lineColor = '#000';
    this.options.xAxis.tickColor = '#000';
    this.options.xAxis.labels.style.color = '#000';
    this.options.legend.itemStyle.color = '#000';
    return this.options;
  }
}
