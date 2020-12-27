import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailChartService {
  options = {
      chart: {
          reflow: false,
          backgroundColor:null,
          style:{
              fontFamily:"Arial",
              color:"#000000"
            }
      },

      colors:["#00ffff", "#ff1aff", "#ffff00", "#00cc00",
      "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"],
  
      title: {
          text: '',
          style: {
              color:'#000000',
          }
      },

      credits: {
          enabled: false,
      },

      subtitle: {
          text: 'Select an area by dragging across the lower chart',
          align: 'left',
          style: {
              color:'#ffffff',
          }
      },

      xAxis: {
          type: 'datetime',
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
            text: null,
            style: {
              color: '#333',
              fontWeight: 'bold',
              fontSize: '12px',
              fontFamily: 'Trebuchet MS, Verdana, sans-serif'
            }            
          }
        },
      
        legend: {
          enabled:false,
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          itemStyle:{
            color:"#333333",
            fontSize:"14px",
          }
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
            
      ],

        exporting: {
            enabled: false
        }
    }
  constructor() { }

  getDetailChartOptions() {
    return this.options;
  }
}
