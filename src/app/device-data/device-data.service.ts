import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class DeviceDataService {

    //private _dataUrl = 'http://api.pacificgyre.com/api2/getData.aspx?userName=&password=&deviceNames=UW-TC-1W-0003,UW-TC-1W-0004,UW-TC-1W-0006,UW-TC-37IM-0013,UW-TC-37IM-0015&startDate=02/22/2017&endDate=03/01/2017&fileFormat=JSON';

    private _dataUrl = './api/deviceData/drifter-UWTC.json';
    //private _dataUrl = './api/deviceData/anotherQuery.json';
    //private _dataUrl = './api/deviceData/drifterData.json';
    //private _dataUrl = './api/deviceData/oneDrifter.json';
    private _deviceData: Observable<any>;
    private _errorMessage: string;
    private deviceData;

    constructor(private _http: Http) { }

    getData(): Observable<any> {
        return this._http.get(this._dataUrl)
            .map((response: Response) => response.json())
            .catch(this._handleError);
    }

    // Based on stackoverflow.com/questions/33260271/restructure-a-json-object
    restructureData(deviceData) {
        var values = [];
        var deviceObject = {};
        var dataArray = [];

        var obj = {
            'device': [{
                'date': {
                    'values': []
                }
            }]
        };

        for (var item in deviceData) {

            var deviceName = deviceData[item].DeviceName;
            var dateTime = deviceData[item].DeviceDateTime;

            // create a new property if matching one doesn't exist already WORKING
            if (!deviceObject.hasOwnProperty(deviceName)) {
                deviceObject[deviceName] = {
                    "deviceName": deviceData[item].DeviceName,
                    "values": []
                };
            }
            // if (!deviceObject.hasOwnProperty(deviceName)) { // CLOSER
            //     deviceObject[deviceName] = {
            //         "deviceName": deviceName,
            //         "dates": {
            //             "dateTime": dateTime,
            //             "values": []
            //         }
            //     };
            // }
            // if (!deviceObject.hasOwnProperty(deviceName)) { // EXPERIMENT ... nope
            //     deviceObject[deviceName] = {
            //         "deviceName": deviceName,
            //         "dates": [{
            //             "dateTime": dateTime,
            //             "values": []
            //         }]
            //     };
            // }

            // else {
            //     deviceObject[deviceName][dateTime] = {
            //         "dates": [{
            //             "dateTime": dateTime,
            //             "values": []
            //         }]

            //     };
            // }
            // console.log(deviceObject[deviceName]['values']);
            deviceObject[deviceName]['values'].push(deviceData[item]);
        }
        // console.log(deviceObject);
        // map the temp object to a final results array
        var results = Object.keys(deviceObject).map(function (key) {
            return deviceObject[key];
        });
        return results;

    }

    createArraysForChart(results){
        // for each object
        // grab device name, dt, bv, gps etc
        


    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');

    }
}

// console.log(Object.keys(deviceData[0]));                    // ["DeviceName", "DeviceDateTime", "Latitude", etc]
// console.log(Object.keys(deviceData[0]).length);             // 5
// console.log(Object.keys(deviceData[0].DeviceName));         // ["0", "1", "2", ... "10"]
// console.log(deviceData[0].DeviceName);                      // OIST-I-0273
// console.log(deviceData[0]['DeviceName']);                   // OIST-I-0273
// console.log(Object.keys(deviceData[0]).length);             // 5  Total number of values per object
// console.log(Object.keys(deviceData[0].DeviceName).length);  // 11 Total Objects with DeviceName ?
// console.log(deviceData.length);                             // 30 total key/value pairs

