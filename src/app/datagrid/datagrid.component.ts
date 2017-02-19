import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceDataService } from '../device-data/device-data.service';

declare var $: any;
declare var kendoGrid: any;


@Component({
  selector: 'app-datagrid',
  template: '<div id="grid"></div><pre></pre>',
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
  // http://stackoverflow.com/questions/33260271/restructure-a-json-object
  restructureData(deviceData) {
    var tmp = {};

    deviceData.forEach(function (item) {

      //  console.log(item);

      // create the key for temp object that will be used for grouping
      var tempKey = item.DeviceName;
      // OR if want to group by both CodeId and Description
      // var tempKey = item.CodeId + item.Description;

      // create a new property if matching one doesn't exist already
      if (!tmp.hasOwnProperty(tempKey)) {
        console.log(tempKey)
        tmp[tempKey] = {
          "DeviceName": item.DeviceName,
          //  "Description": item.Description,
          "values": [] // new nested array to push to
        };
      }
      // at this point there will always be a tmp[tempKey].languages array to push to

      // manually create language object if you don't want the extra
      // properties already set above, otherwise use whole item object
      tmp[tempKey].values.push(item);
      //  console.log(tmp[tempKey].values);

    });
    // map the temp object to a final results array
    var results = Object.keys(tmp).map(function (key) {
      return tmp[key];
    });
    console.log(results);

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

