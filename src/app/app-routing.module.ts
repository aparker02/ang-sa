import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelsComponent } from './panels/panels.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MapComponent } from './map/map.component';
import { AmchartComponent } from './amchart/amchart.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { PanelsPt2Component } from './panels-pt2/panels-pt2.component';
import { KendoComponentsComponent } from './kendo-components/kendo-components.component';
import { LineChart2Component } from './line-chart2/line-chart2.component';


const routes: Routes = [

  //  { path: '', redirectTo: '/panels', pathMatch: 'full' },
    { path: 'panels', component: PanelsComponent },
    { path: 'datagrid', component: DatagridComponent },
    { path: 'line-chart', component: LineChartComponent },
    { path: 'map', component: MapComponent },
    { path: 'amchart', component: AmchartComponent },
    { path: 'google-map', component: GoogleMapComponent },
    { path: 'panels-pt2', component: PanelsPt2Component },
    { path: 'kendo-components', component: KendoComponentsComponent },
    { path: 'line-chart2', component: LineChart2Component }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
