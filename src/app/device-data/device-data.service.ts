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

    private _dataUrl = './api/deviceData/drifterData.json';
    // private _dataUrl = './api/deviceData/oneDrifter.json';
    private _deviceData: Observable<any>;
    private _errorMessage: string;
    private deviceData;

    constructor(private _http: Http) { }

    getData(): Observable<any> {
        return this._http.get(this._dataUrl)
            .map((response: Response) => response.json())
            .catch(this._handleError);
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

    // http://stackoverflow.com/questions/33260271/restructure-a-json-object
    restructureDataObj(deviceData) {
        var tmp = {};

        deviceData.forEach(function (item) {

            // create the key for temp object that will be used for grouping
            var tempKey = item.DeviceName;

            // create a new property if matching one doesn't exist already
            if (!tmp.hasOwnProperty(tempKey)) {
              //  console.log(tempKey)
                tmp[tempKey] = {
                    "DeviceName": item.DeviceName,
                    //  "Description": item.Description,
                    "values": [] // new nested array to push to
                };
            }
            // manually create language object if you don't want the extra
            // properties already set above, otherwise use whole item object
            tmp[tempKey].values.push(item);
        });
        // map the temp object to a final results array
        var results = Object.keys(tmp).map(function (key) {
            return tmp[key];
        });
        return results;
    }
    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');

    }
}