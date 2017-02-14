import { Component, ViewContainerRef } from '@angular/core';
import { DeviceDataService } from './device-data/device-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DeviceDataService ]
})
export class AppComponent {
  title = 'Happy Heart Day!';

  public constructor(private viewContainerRef: ViewContainerRef) {}
}
