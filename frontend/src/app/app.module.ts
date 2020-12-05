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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NaviComponent,
    ChartComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
