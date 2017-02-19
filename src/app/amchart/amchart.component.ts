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
  //  this._dataService.convertDate(deviceData);
    let dataByDevice = this._dataService.restructureDataObj(deviceData);
    let chartData = {};

    for(var x: number = 0; x < dataByDevice.length; x++ ) {
          console.log(dataByDevice[x].DeviceName);
          console.log(dataByDevice[x].values[x].DeviceDateTime);
    }

    //this.chartData

    this.config = {
      // "dataProvider": this.chartData,
      "type": "serial",
      "categoryField": "date",
      "dataDateFormat": "YYYY-MM-DD HH:MM:SS",
      "categoryAxis": {
        "minPeriod": "hh",
        "parseDates": true
      },
      "chartCursor": {
        "enabled": true,
        "categoryBalloonDateFormat": "JJ:NN"
      },
      "chartScrollbar": {
        "enabled": true
      },
      "trendLines": [],
      "graphs": [
        {
          "bullet": "square",
          "id": "AmGraph-2",
          "title": "Voltage",
          "valueField": "column-1"
        }
      ],
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
          "text": "Chart Title"
        }
      ],
      "dataProvider": [
        {
          "column-1": 8,
          "column-2": 5,
          "date": "2014-03-01 08:00:00"
        },
        {
          "column-1": 6,
          "column-2": 7,
          "date": "2014-03-01 09:00:00"
        },
        {
          "column-1": 2,
          "column-2": 3,
          "date": "2014-03-01 10:00:00"
        },
        {
          "column-1": 1,
          "column-2": 3,
          "date": "2014-03-01 11:00:00"
        },
        {
          "column-1": 2,
          "column-2": 1,
          "date": "2014-03-01 12:00:00"
        },
        {
          "column-1": 3,
          "column-2": 2,
          "date": "2014-03-01 13:00:00"
        },
        {
          "column-1": 6,
          "column-2": 8,
          "date": "2014-03-01 14:00:00"
        }
      ]
    };

    let chartdiv = $(this.el.nativeElement).find("#amchartdiv");
    console.log(this.config);
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
