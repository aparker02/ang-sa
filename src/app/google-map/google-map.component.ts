import { Component, OnInit } from '@angular/core';
import { DeviceDataService } from '../device-data/device-data.service';
declare var google: any;


@Component({
  selector: 'app-google-map',
  template: '<div id="googleMap" style="width:800px;height:600px;">',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  deviceData: any;
  errorMessage: string;

  constructor(private _dataService: DeviceDataService) {
  }

  ngOnInit() {
    this._dataService.getData()
      .subscribe(
      (deviceData) => { this.deviceData = deviceData; },
      (error) => { this.errorMessage = <any>error; },
      () => this.prepData(this.deviceData)
      );

  }
  prepData(deviceData) {
    let deviceObj = this._dataService.restructureDataObj(deviceData);
    // set array of markers:  https://developers.google.com/maps/documentation/javascript/examples/icon-complex
    // console.log(deviceObj["OIST-I-0257"].values[0].BatteryVoltage); // This works!!
    // move this to data-service
    let numberDevices = Object.keys(deviceObj).length;
    // var chartData = [];
    for (let x = 0; x < numberDevices; x++) { // loops through devices
      let device = Object.keys(deviceObj)[x];
      var chartData = [];
      let numFields = deviceObj[device].values.length;
      for (let b = numFields - 1; b > 1; b--) {

        var data = {
          'name': deviceObj[device].values[b].DeviceName,
          'date': deviceObj[device].values[b].DeviceDateTime,
          'latitude': deviceObj[device].values[b].Latitude,
          'longitude': deviceObj[device].values[b].Longitude
        };
        console.log(data.name); // spits out current name
        chartData.push(data);
      }

      var myLatLng = {
        lat: deviceObj[device].values[0].Latitude,
        lng: deviceObj[device].values[0].Longitude
      }

      var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 3,
        center: myLatLng
      });
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'remote island'
      });

      console.log(chartData);

    }

  }
  initMap(){



  }



}


