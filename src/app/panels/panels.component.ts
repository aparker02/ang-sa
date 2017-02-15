import { Component, OnInit, ComponentFactoryResolver, HostListener, ComponentFactory,
  ComponentRef, ViewContainerRef, ReflectiveInjector, ElementRef } from '@angular/core';
import { DatagridComponent } from '../datagrid/datagrid.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
// import { GraphComponent } from '../graph/graph.component';
import { MapComponent } from '../map/map.component';

declare var $: any;
declare var GoldenLayout: any;

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styles: ['#layout { height: 800px; }']
})
export class PanelsComponent implements OnInit {

  private config: any;
  private layout: any;

  constructor(private el: ElementRef, private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
    this.config = {
      content: [{
        type: 'column',
        content: [{
          type: 'component',
          componentName: 'datagrid',
          componentState: { message: "Top Full Width" }
        }, {
          type: 'row',
          content: [{
            type: 'component',
            componentName: 'line-chart',
            componentState: { message: "Bottom Right" }
          }, {
            type: 'component',
            componentName: 'map',
            componentState: { message: "Bottom Left" }
          }]
        }]
      }]
    };
  }

  ngOnInit() {
    //this.layout = new GoldenLayout(this.config);
     this.layout = new GoldenLayout(this.config, $(this.el.nativeElement).find("#layout"));

    this.layout.registerComponent('datagrid', (container, componentState) => {
      let factory = this.componentFactoryResolver.resolveComponentFactory(DatagridComponent);
      var compRef = this.viewContainer.createComponent(factory);
      container.getElement().append($(compRef.location.nativeElement));

      // compRef.instance.setEventHub(this.layout.eventHub);
      //compRef.instance.message = componentState.message;
      // container.getElement().html('<h2>' + componentState.message + '</h2>');
    });
    this.layout.registerComponent('map', (container, componentState) => {

      let factory = this.componentFactoryResolver.resolveComponentFactory(MapComponent);
      var compRef = this.viewContainer.createComponent(factory);
      container.getElement().append($(compRef.location.nativeElement));
      // compRef.instance.setEventHub(this.layout.eventHub);
      //compRef.instance.message = componentState.message;
      // container.getElement().html('<h2>' + componentState.message + '</h2>');
    });

    this.layout.registerComponent('line-chart', (container, componentState) => {
       let factory = this.componentFactoryResolver.resolveComponentFactory(LineChartComponent);
       var compRef = this.viewContainer.createComponent(factory);
       container.getElement().append($(compRef.location.nativeElement));

      // var compRef = this.viewContainer.createComponent(factory);
      // compRef.instance.message = componentState.message;
      // container.getElement().html('<h2>' + componentState.message + '</h2>');

    });

    this.layout.init();

  }

}
