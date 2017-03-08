import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceDataService } from '../device-data/device-data.service';

declare var $: any;
declare var kendoGrid: any;


@Component({
  selector: 'app-datagrid',
  template: '<div id="grid"></div>',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit {

  errorMessage: string;
  deviceData: any;

  constructor(private _dataService: DeviceDataService) { }

  ngOnInit() {
    this._dataService.getData()
      .subscribe(
      (deviceData) => { this.deviceData = deviceData; },
      (error) => { this.errorMessage = <any>error; },
      () => this.createGrid(this.deviceData)
      );
  }

  createGrid(deviceData): void {
    $("#grid").kendoGrid({
      // height: 800,

      filterable: true,
      groupable: true,
      reorderable: true,
      sortable: { mode: "multiple" },
      selectable: "multiple row",
      //scrollable: true,
      // pageable: true,
      columns: [
        { field: "DeviceName", title: "Device Name" },
        { field: "DeviceDateTime", title: "Date Time", template: '#=kendo.toString(DeviceDateTime, "f") #' },
        { field: "Latitude", title: "Latitude" },
        { field: "Longitude", title: "Longitude" },
        { field: "BatteryVoltage", title: "Voltage" },
        { field: "BarometricPressure", title: "B Press" },
        { field: "GpsQuality", title: "GPS Quality" },
        // { field: "Temperature0cm", title: "Temp 0" },
         { field: "TemperaturePod1", title: "Temp 1" },
        // { field: "TemperaturePod2", title: "Temp 2" },
        // { field: "TemperaturePod3", title: "Temp 3" },
        // { field: "TemperaturePod4", title: "Temp 4" },
        // { field: "TemperaturePod5", title: "Temp 5" },
        // { field: "TemperaturePod6", title: "Temp 6" },
        // { field: "TemperaturePod7", title: "Temp 7" },
        // { field: "TemperaturePod8", title: "Temp 8" },
        // { field: "TemperaturePod9", title: "Temp 9" },
        // { field: "TemperaturePod10", title: "Temp 10" },
        // { field: "TemperaturePod11", title: "Temp 11" },
        // { field: "TemperaturePod12", title: "Temp 12" }
      ],
      dataSource: {
        data: deviceData,
        // pageSize: 13,
        schema: {
          model: {
            fields: {
              DeviceName: { type: "string" },
              DeviceDateTime: { type: "string" },
              Latitude: { type: "number" },
              Longitude: { type: "number" },
              BatteryVoltage: { type: "number" },
              BarometricPressure: { type: "number" },
              GpsQuality: { type: "number" },
              Temperature0cm: { type: "number" },
              TemperaturePod1: { type: "number" },
              TemperaturePod2: { type: "number" },
              TemperaturePod3: { type: "number" },
              TemperaturePod4: { type: "number" },
              TemperaturePod5: { type: "number" },
              TemperaturePod6: { type: "number" },
              TemperaturePod7: { type: "number" },
              TemperaturePod8: { type: "number" },
              TemperaturePod9: { type: "number" },
              TemperaturePod10: { type: "number" },
              TemperaturePod11: { type: "number" },
              TemperaturePod12: { type: "number" }
            }
          }
        },
      }
    });

  }
}

