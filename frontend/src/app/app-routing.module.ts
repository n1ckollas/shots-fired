import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { HomeComponent } from './components/home/home.component';
import { MdChartComponent } from './components/md-chart/md-chart.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  // {path:'deadliness', component},
  {path:'shootings', component: ChartComponent},
  {path:'evictions', component: MdChartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
