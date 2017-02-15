import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceDataService } from '../device-data/device-data.service';

declare var $: any;
declare var kendoChart: any;

@Component({
  selector: 'app-line-chart',
  template: '<div id="chart"></div>',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

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
  createChart(deviceData): void {

    $("#chart").kendoChart({


      title: {
        text: ""
      },
      legend: {
        position: "bottom"
      },
      chartArea: {
        background: ""
      },
      seriesDefaults: {
        type: "line",
        style: "smooth"
      },
      series: [{
        name: "India",
        data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
      }, {
        name: "World",
        data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
      }, {
        name: "Russian Federation",
        data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
      }, {
        name: "Haiti",
        data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
      }],
      valueAxis: {
        labels: {
          format: "{0}%"
        },
        line: {
          visible: false
        },
        axisCrossingValue: -10
      },
      categoryAxis: {
        categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
        majorGridLines: {
          visible: false
        },
        labels: {
          rotation: "auto"
        }
      },
      tooltip: {
        visible: true,
        format: "{0}%",
        template: "#= series.name #: #= value #"
      }
    });
  }

//  $(document).ready(createChart);
 // $(document).bind("kendo:skinChange", createChart);

}

