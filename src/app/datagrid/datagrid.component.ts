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
      columns: [
        {
          field: "DeviceName",
          title: "Device Name"
        },
        {
          field: "DeviceDateTime",
          title: "Device Date Time"
        },
        {
          field: "Latitude",
          title: "Latitude"
        },
                {
          field: "Longitude",
          title: "Longitude"
        },
        {
          field: "BatteryVoltage",
          title: "Voltage"
        },


      ],
      dataSource: {
        data: deviceData
      }
    });

  }
}

