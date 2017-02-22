import { Component, ElementRef, OnInit } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { DeviceDataService } from '../device-data/device-data.service';

//declare var $: any;



@Component({
  selector: 'app-amchart',
  template: '<div id="amchartdiv"></div>',
  styles: ['#amchartdiv { height: 800px; }']
})
export class AmchartComponent implements OnInit {

  errorMessage: string;
  deviceData: any;
  config: any;
  chart: any;
  currentName: string;
  restructuredData: [{}];


  constructor(private el: ElementRef, private _dataService: DeviceDataService) { }

  ngOnInit() {
    this._dataService.getData()
      .subscribe(
      (deviceData) => { this.deviceData = deviceData; },
      (error) => { this.errorMessage = <any>error; },
      () => this.prepDataForChart(this.deviceData)
      );
  }

  prepDataForChart(deviceData) {

    let deviceObj = this._dataService.restructureDataObj(deviceData);

    // console.log(deviceObj["OIST-I-0257"].values[0].BatteryVoltage); // This works!!

    let numberDevices = Object.keys(deviceObj).length;
    // var chartData = [];
    for (let x = 0; x < numberDevices; x++) { // loops through devices
      //  console.log(Object.keys(deviceObj));
      let device = Object.keys(deviceObj)[x];
      // var dataProvider = null;
      var chartData = [];

      // console.log(JSON.stringify(deviceObj[device]));

      let numFields = deviceObj[device].values.length;
      console.log(numFields);
      // for (let b = 0; b < numFields; b++) {
      for (let b = numFields - 1; b > 1; b--) {

        var data = {
          'name': deviceObj[device].values[b].DeviceName,
          'date': deviceObj[device].values[b].DeviceDateTime,
          'voltage': deviceObj[device].values[b].BatteryVoltage
        };
        // add data to some object?
        //console.log(data);
        var bs = JSON.stringify(data);
        //  console.log(deviceObj[device].values[6].BatteryVoltage);
        console.log(data.name); // spits out current name
        // var chartData = [];
        chartData.push(data);

        var tempTitle = deviceObj[device].values[b].DeviceDateTime;
      }
      //      dataProvider = JSON.stringify(chartData);
      console.log(chartData);

    }


    //  let chartData = [];

    this.config = {
      "dataProvider": chartData,
      "type": "serial",
      "categoryField": "date",
      "dataDateFormat": "YYYY-MM-DD HH:MM:SS",
      "categoryAxis": {
        "minPeriod": "DD",
        "parseDates": false
      },
      "chartCursor": {
        "enabled": true,
        "categoryBalloonDateFormat": "JJ:NN"
      },
      "chartScrollbar": {
        "enabled": true
      },
      "trendLines": [],
      "graphs": [{
        "lineAlpha": 1,
        "lineThickness": 2,
        "valueField": "voltage",
        "lineColor": "#00a1f1"
      }],
      "guides": [],
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          "title": "Voltage"
        }
      ],
      "allLabels": [],
      "balloon": {},
      "legend": {
        "enabled": true,
        "useGraphSettings": true
      },
      "titles": [
        {
          "id": "Title-1",
          "size": 15,
          "text": name
        }
      ]
    };

    let chartdiv = $(this.el.nativeElement).find("#amchartdiv");
    // console.log(this.config);
    if (chartdiv) {
      this.chart = AmCharts.makeChart('amchartdiv', this.config, 1);
    }

  }
  // change to date object
  // grab all unique devices
  // create new array?
  // add field for latlng?
  // http://stackoverflow.com/questions/1184123/is-it-possible-to-add-dynamically-named-properties-to-javascript-object

}
