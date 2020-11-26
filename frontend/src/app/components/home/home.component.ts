import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info = []; 

  public options: any = {
    title: {
      text: 'Covid 19 statistics for the city of New York'
  },

  yAxis: {
      title: {
          text: 'Number of Deathss'
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

  
  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.apiService.getData().subscribe(data => {
        let bk = { name: 'Brooklyn', data: Array<number>() }
        let bx = { name: 'Bronx',    data: Array<number>() }
        let mnh = {name: 'Manhattan',data: Array<number>() }
        let si = { name: 'Staten Island',  data: Array<number>() }

        for(let obj of data){

            let date = new Date(obj['date_of_interest']);
            let dateFormat = this.months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear(); 
            this.options.xAxis.categories.push(dateFormat);
            
            bk.data.push(obj['bk_death_count']);
            bx.data.push(parseInt(obj['bx_death_count']));
            mnh.data.push(parseInt(obj['mn_death_count']));
            si.data.push(parseInt(obj['si_death_count']));

        }
        this.options.series.push(bk);
        this.options.series.push(bx);
        this.options.series.push(mnh);
        this.options.series.push(si);
        console.log(this.options);
        Highcharts.chart('container', this.options);
    });
  }

}
