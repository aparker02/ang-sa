import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelsComponent } from './panels/panels.component';
import { HomeComponent } from './home/home.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout/main-layout.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { NavigationComponent } from './shared/layout/navigation/navigation.component';
import { RibbonComponent } from './shared/layout/ribbon/ribbon.component';
import { ShortcutComponent } from './shared/layout/shortcut/shortcut.component';
import { MapComponent } from './map/map.component';
import { AmchartComponent } from './amchart/amchart.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { PanelsPt2Component } from './panels-pt2/panels-pt2.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { KendoComponentsComponent } from './kendo-components/kendo-components.component';
import { LineChart2Component } from './line-chart2/line-chart2.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelsComponent,
    HomeComponent,
    DatagridComponent,
    LineChartComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    RibbonComponent,
    ShortcutComponent,
    MapComponent,
    AmchartComponent,
    GoogleMapComponent,
    PanelsPt2Component,
    DatePickerComponent,
    KendoComponentsComponent,
    LineChart2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
