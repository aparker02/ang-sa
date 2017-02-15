import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceDataService } from '../device-data/device-data.service';

declare var $: any;
declare var kendoMap: any;

@Component({
  selector: 'app-map',
  template: '<div id="map"></div>',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  errorMessage: string;
  deviceData: any;

  constructor(private _dataService: DeviceDataService) { }

  ngOnInit() {
    this._dataService.getData()
      .subscribe(
      (deviceData) => { this.deviceData = deviceData; },
      (error) => { this.errorMessage = <any>error; },
      () => this.createMap(this.deviceData)
      );
  }
  createMap(deviceData): void {
    $("#map").kendoMap({
                center: [30.268107, -97.744821],
                zoom: 15,
                layers: [{
                    type: "tile",
                    urlTemplate: "http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
                    subdomains: ["a", "b", "c"],
                    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>." +
                                 "Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>"
                }, {
                    type: "marker",
                    dataSource: {
                        transport: {
                            read:
                                "../api/deviceData/store-locations.json"

                        }
                    },
                    locationField: "latlng",
                    titleField: "name"
                }]
            });
  }
}

