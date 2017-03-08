import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceDataService } from '../device-data/device-data.service';

declare var $: any;
declare var kendo: any;
declare var kendoChart: any;

@Component({
  selector: 'app-line-chart2',
  template: '<div id="chart"></div><div id="chart2"></div>',
  styleUrls: ['./line-chart2.component.css']
})
export class LineChart2Component implements OnInit {

  errorMessage: string;
  deviceData: any;

  constructor(private _dataService: DeviceDataService) { }

  ngOnInit() {
    this._dataService.getData()
      .subscribe(
      (deviceData) => { this.deviceData = deviceData; },
      (error) => { this.errorMessage = <any>error; },
      () => this.createChart(this.deviceData)
      );
  }

  createChart(deviceData) {
    var results = this._dataService.restructureData(deviceData);
    var dateData = [];
    var gpsQualityData = [];
    var voltageData = [];
    var bPressData = [];
    var tempPod1 = [];
    var tempPod2 = [];
    var tempPod3 = [];
    var tempPod4 = [];
    var tempPod5 = [];
    var tempPod6 = [];
    var tempPod7 = [];
    var tempPod8 = [];
    var tempPod9 = [];
    var tempPod10 = [];
    var tempPod11 = [];
    var tempPod12 = [];

    // hacky hacky hacky

    for (var i = 0; i < results[1]['values'].length; i++) {
      if (results[1]['values'][i].DeviceDateTime) {
        var dateTime = new Date(results[1]['values'][i].DeviceDateTime);
      }
      dateData.push(dateTime);
      gpsQualityData.push(results[1]['values'][i].GpsQuality);
      voltageData.push(results[1]['values'][i].BatteryVoltage);
      bPressData.push(results[1]['values'][i].BarometricPressure);
      tempPod1.push(results[1]['values'][i].TemperaturePod1);
      tempPod2.push(results[1]['values'][i].TemperaturePod2);
      tempPod3.push(results[1]['values'][i].TemperaturePod3);
      tempPod4.push(results[1]['values'][i].TemperaturePod4);
      tempPod5.push(results[1]['values'][i].TemperaturePod5);
      tempPod6.push(results[1]['values'][i].TemperaturePod6);
      tempPod7.push(results[1]['values'][i].TemperaturePod7);
      tempPod8.push(results[1]['values'][i].TemperaturePod8);
      tempPod9.push(results[1]['values'][i].TemperaturePod9);
      tempPod10.push(results[1]['values'][i].TemperaturePod10);
      tempPod11.push(results[1]['values'][i].TemperaturePod11);
      tempPod12.push(results[1]['values'][i].TemperaturePod12);
    }

    $("#chart").kendoChart({
      dataSource: {
        data: results
      },
      title: {
        text: results[0].deviceName
      },
      seriesDefaults: {
        type: "line",
        style: "smooth"
      },
      series: [{
        name: "GpsQuality",
        data: gpsQualityData,
        axis: "gpsquality"
      }, {
        name: "BatteryVoltage",
        data: voltageData,
        axis: "batteryvoltage"
      }, {
        name: "BarometricPressure",
        data: bPressData,
        axis: "BarometricPressure"
      }],
      legend: {
        position: "bottom"
      },
      categoryAxis: {
        baseUnit: "days",
        categories: dateData
      },
      valueAxis: [{
        name: "gpsquality",
        labels: {
          format: "{0}"
        }
      }, {
        name: "batteryvoltage",
        labels: {
          format: "{0}"
        }
      },
      {
        name: "BarometricPressure",
        labels: {
          format: "{0}"
        }
      }],
      tooltip: {
        visible: true,
        format: "{0}",
        template: "#= series.name #: #= value #"
      }
    });
    $("#chart2").kendoChart({
      dataSource: {
        data: results
      },
      title: {
        text: results[0].deviceName + " Avg Daily Temp"
      },
      seriesDefaults: {
        type: "line",
        style: "smooth"
      },
      series: [{
        name: "TempPod1",
        data: tempPod1,
        axis: "temperature"
      },
      {
        name: "TempPod2",
        data: tempPod2,
        axis: "temperature"
      },
      {
        name: "TempPod3",
        data: tempPod3,
        axis: "temperature"
      },
      {
        name: "TempPod4",
        data: tempPod4,
        axis: "temperature"
      },
      {
        name: "TempPod5",
        data: tempPod5,
        axis: "temperature"
      },
      {
        name: "TempPod6",
        data: tempPod6,
        axis: "temperature"
      },
      {
        name: "TempPod7",
        data: tempPod7,
        axis: "temperature"
      },
      {
        name: "TempPod8",
        data: tempPod8,
        axis: "temperature"
      },
      {
        name: "TempPod9",
        data: tempPod9,
        axis: "temperature"
      },
      {
        name: "TempPod10",
        data: tempPod10,
        axis: "temperature"
      },
      {
        name: "TempPod11",
        data: tempPod11,
        axis: "temperature"
      },
      {
        name: "TempPod12",
        data: tempPod12,
        axis: "temperature"
      }],
      legend: {
        position: "bottom"
      },
      categoryAxis: {
        baseUnit: "days",
        categories: dateData
      },
      valueAxis: [{
        name: "temperature",
        labels: {
          format: "{0}"
        }
      }],
      tooltip: {
        visible: true,
        format: "{0}",
        template: "#= series.name #: #= value #"
      }
    });

  }
}

