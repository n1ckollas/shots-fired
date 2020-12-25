import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PrimeNgModule } from './prime-ng.module';
import { HttpClientModule } from '@angular/common/http';

import { ThemeService } from './services/theme.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NaviComponent } from './components/navi/navi.component';
import { ChartComponent } from './components/chart/chart.component';
import { SlideBarComponent } from './components/slide-bar/slide-bar.component';
import { MdChartComponent } from './components/md-chart/md-chart.component';
import { ApiService } from './services/api.service';
import { MasterChartComponent } from './components/md-chart/master-chart/master-chart.component';
import { DetailChartComponent } from './components/md-chart/detail-chart/detail-chart.component';
import { SimpleChartService} from './services/chart.service';
import { MasterChartService } from './services/master-chart.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NaviComponent,
    ChartComponent,
    SlideBarComponent,
    MdChartComponent,
    MasterChartComponent,
    DetailChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNgModule,
  ],
  providers: [
    ThemeService,
    ApiService,
    SimpleChartService,
    MasterChartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
