import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelsComponent } from './panels/panels.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MapComponent } from './map/map.component';
import { AmchartComponent } from './amchart/amchart.component';

const routes: Routes = [

  //  { path: '', redirectTo: '/panels', pathMatch: 'full' },
    { path: 'panels', component: PanelsComponent },
    { path: 'datagrid', component: DatagridComponent },
    { path: 'line-chart', component: LineChartComponent },
    { path: 'map', component: MapComponent },
    { path: 'amchart', component: AmchartComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
