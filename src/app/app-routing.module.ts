import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelsComponent } from './panels/panels.component';
// import { TableComponent } from './table/table.component';
// import { JqGridComponent } from './jq-grid/jq-grid.component';
// import { MapComponent } from './map/map.component';
// import { GraphComponent } from './graph/graph.component';



const routes: Routes = [

  //  { path: '', redirectTo: '/panels', pathMatch: 'full' },
    { path: 'panels', component: PanelsComponent }
    // { path: 'table', component: TableComponent },
    // { path: 'jq-grid', component: JqGridComponent },
    // { path: 'graph', component: GraphComponent },
    // { path: 'map', component: MapComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}