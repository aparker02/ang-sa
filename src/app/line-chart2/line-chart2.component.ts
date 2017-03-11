import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceDataService } from '../device-data/device-data.service';

declare var $: any;
declare var kendo: any;
declare var kendoChart: any;

@Component({
  selector: 'app-line-chart2',
  template: '<div id="chart"></div><button id="pdf">Save to PDF</button><div id="chart2"></div>',
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

    var axisMin = 0;
    var axisMax = 10;

    function updateRange(e) {
      axisMin = e.axisRanges.axis.min;
      axisMax = e.axisRanges.axis.max;
    }

    function restoreRange(e) {
      e.sender.options.categoryAxis.min = axisMin;
      e.sender.options.categoryAxis.max = axisMax;
    }
    function onSeriesClick(e) {
      var index = e.series.data.indexOf(e.dataItem); // YES YES YES
      var chart = $("#chart").data("kendoChart");
      chart.toggleHighlight(true, e.series.name);
      console.log(e.dataItem + " " + index + " " + e.value.x);
      //chart.saveAsPDF();
    }

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
      theme: "Flat",
   //  renderAs: "canvas",
      seriesClick: onSeriesClick,
      dataSource: {
        data: results
      },
      dataBound: function(e) {
        console.log("databound?");
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
        axis: "gpsquality",
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
        baseUnit: "hours",
        categories: dateData,
        majorGridLines: {
          visible: true,
          step: 6
        },
        minorGridLines: {
          visible: false
        },
        labels: {
          step: 6,
          template: "#=kendo.toString(value, 'MM/dd \\n HH:ss')#",
          rotation: "auto",
        }
      },
      valueAxis: [{
        name: "gpsquality",
        labels: {
          format: "{0:0.0}"
        },
        color: "rgb(16, 196, 178)"
      }, {
        name: "batteryvoltage",
        labels: {
          format: "{0:0.0}"
        },
        color: "rgb(255, 118, 99)"
      },
      {
        name: "BarometricPressure",
        labels: {
          format: "{0:0.0}"
        },
        color: "rgb(255, 183, 79)" // multiply by fraction to darken
      }],
      tooltip: {
     //   shared: true,
        visible: true,
        format: "{0}",
        template: "#= series.name #: #= value # #= series.data.indexOf(value) #"
      },
      zoomable: {
        mousewheel: {
     //     lock: "y"
        },
        selection: {
    //      lock: "y"
        }
      },
      pannable: {
            lock: "y"
      },
      //     zoomable: {
      //       mousewheel: {
      //         lock: "y"
      //       },
      //       selection: {
      //         lock: "y"
      //       }
      //     },
      // zoom: updateRange,
      // drag: updateRange,
      // dataBound: restoreRange
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

