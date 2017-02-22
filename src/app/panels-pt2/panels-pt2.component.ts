import { Component, OnInit, ComponentFactoryResolver, HostListener, ComponentFactory,
  ComponentRef, ViewContainerRef, ReflectiveInjector, ElementRef } from '@angular/core';
import { DatagridComponent } from '../datagrid/datagrid.component';
import { AmchartComponent } from '../amchart/amchart.component';
import { GoogleMapComponent } from '../google-map/google-map.component';

declare var $: any;
declare var GoldenLayout: any;

@Component({
  selector: 'app-panels-pt2',
  templateUrl: './panels-pt2.component.html',
  styles: ['#layout { height: 800px; }']
})
export class PanelsPt2Component implements OnInit {

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
            componentName: 'amchart',
            componentState: { message: "Bottom Right" }
          }, {
            type: 'component',
            componentName: 'google-map',
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
    this.layout.registerComponent('google-map', (container, componentState) => {

      let factory = this.componentFactoryResolver.resolveComponentFactory(GoogleMapComponent);
      var compRef = this.viewContainer.createComponent(factory);
      container.getElement().append($(compRef.location.nativeElement));
      // compRef.instance.setEventHub(this.layout.eventHub);
      //compRef.instance.message = componentState.message;
      // container.getElement().html('<h2>' + componentState.message + '</h2>');
    });

    this.layout.registerComponent('amchart', (container, componentState) => {
       let factory = this.componentFactoryResolver.resolveComponentFactory(AmchartComponent);
       var compRef = this.viewContainer.createComponent(factory);
       container.getElement().append($(compRef.location.nativeElement));

      // var compRef = this.viewContainer.createComponent(factory);
      // compRef.instance.message = componentState.message;
      // container.getElement().html('<h2>' + componentState.message + '</h2>');

    });

    this.layout.init();

  }

}
