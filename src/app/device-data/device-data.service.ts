import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class DeviceDataService {

    //http://api.pacificgyre.com/api2/getData.aspx?UserName=tyates&Password=micro-star&DeviceNames=oist-i-0273&StartDate=02%2F12%2F2017&EndDate=02%2F14%2F2017&Headers=true&FileFormat=JSON

    //private _dataUrl = './api/deviceData/anotherQuery.json';

    //private _dataUrl = './api/deviceData/drifterData.json';
     private _dataUrl = './api/deviceData/oneDrifter.json';
    private _deviceData: Observable<any>;
    private _errorMessage: string;
    private deviceData;

    constructor(private _http: Http) { }

    getData(): Observable<any> {
        return this._http.get(this._dataUrl)
            .map((response: Response) => response.json())
            .catch(this._handleError);
    }

    // Based loosely on http://stackoverflow.com/questions/33260271/restructure-a-json-object
    restructureDataObj(deviceData) {

        // console.log(Object.keys(deviceData[0]));                    // ["DeviceName", "DeviceDateTime", "Latitude", etc]
        // console.log(Object.keys(deviceData[0]).length);             // 5
        // console.log(Object.keys(deviceData[0].DeviceName));         // ["0", "1", "2", ... "10"]

        // console.log(deviceData[0].DeviceName);                      // OIST-I-0273
        // console.log(deviceData[0]['DeviceName']);                   // OIST-I-0273
        // console.log(Object.keys(deviceData[0]).length);             // 5  Total number of values per object
        // console.log(Object.keys(deviceData[0].DeviceName).length);  // 11 Total Objects with DeviceName ?
        // console.log(deviceData.length);                             // 30 total name/value pairs

        let deviceArray = [];
        var deviceObj = {};

        for (let x = 0; x < deviceData.length; x++) {

            let currentDevice = deviceData[x].DeviceName;
            let currentDate = deviceData[x].DeviceDateTime;

            if (!deviceObj.hasOwnProperty(currentDevice)) {
                // deviceObj[currentDevice] = {}
                // deviceObj[currentDevice][currentDate] = {
                //     "values": deviceData[x]
                // }

                deviceObj[currentDevice] = {
                    "values" : []
                };
                // deviceObj[currentDevice][currentDate] = {
                //     "values": deviceData[x]
                // }
            }
            //console.log(deviceObj[x]);
            deviceObj[currentDevice].values.push(deviceData[x]);
            // ["OIST-I-0257"].values["0"].BatteryVoltage

            // else {
            //     deviceObj[currentDevice][currentDate] = {
            //         "values": deviceData[x]
            //     }
            // }
        }
      //   console.log(deviceObj)
        return deviceObj;
    }

    convertDate(deviceData) {
        for (var i = 0; i < deviceData.length; i++) {
            console.log(deviceData[i].DeviceDateTime);
            deviceData[i].DeviceDateTime = new Date(deviceData[i].DeviceDateTime);
            // deviceData[i].DeviceDateTime = deviceData[i].DeviceDateTime.substring(0, 10);
        }
        return deviceData;
    }
    // https://jsfiddle.net/lalatino/mcuzr/
    sortByDescDate(deviceData) {
        var arr = [];
        var prop;
        for (prop in deviceData) {
            if (deviceData.hasOwnProperty(prop)) {
                arr.push({
                    'key': prop,
                    'value': deviceData[prop]
                });

            }
        }
        arr.sort(function (a, b) {
            return a.value - b.value;
        });
        console.log(arr);
        return arr; // returns array
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');

    }
}