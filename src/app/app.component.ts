import { Component, ViewContainerRef } from '@angular/core';
import { DeviceDataService } from './device-data/device-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DeviceDataService ]
})
export class AppComponent {
  title = 'Angular 2 - Smart Admin - Golden Layout - Kendo-UI';

  public constructor(private viewContainerRef: ViewContainerRef) {}
}
