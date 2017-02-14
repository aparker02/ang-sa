import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class DeviceDataService {

    //private _dataUrl = './api/data/drifterData.json';
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

    convertDate(deviceData){
        for(var i = 0; i < deviceData.length; i++){
            console.log(deviceData[i].DeviceDateTime);
            //deviceData[i].DeviceDateTime = new Date(deviceData[i].DeviceDateTime);
           // deviceData[i].DeviceDateTime = deviceData[i].DeviceDateTime.substring(0, 10);
        }
        return deviceData;
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');

    }
}