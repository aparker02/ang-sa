import { Component, OnInit, ComponentFactoryResolver, HostListener, ComponentFactory,
  ComponentRef, ViewContainerRef, ReflectiveInjector, ElementRef } from '@angular/core';
// import { TableComponent } from '../table/table.component';
// import { GraphComponent } from '../graph/graph.component';
// import { MapComponent } from '../map/map.component';

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
          componentName: 'map',
          componentState: { message: "Top Left" }
        }, {
          type: 'row',
          content: [{
            type: 'component',
            componentName: 'chart',
            componentState: { message: "Top Right" }
          }, {
            type: 'component',
            componentName: 'table',
            componentState: { message: "Bottom Right" }
          }]
        }]
      }]
    };
  }

  ngOnInit() {
    //this.layout = new GoldenLayout(this.config);
     this.layout = new GoldenLayout(this.config, $(this.el.nativeElement).find("#layout"));


    this.layout.registerComponent('table', (container, componentState) => {
      // let factory = this.componentFactoryResolver.resolveComponentFactory(TableComponent);

      // var compRef = this.viewContainer.createComponent(factory);
      // container.getElement().append($(compRef.location.nativeElement));
      // compRef.instance.setEventHub(this.layout.eventHub);
      //compRef.instance.message = componentState.message;
      console.log(componentState.message);
        container.getElement().html('<h2>' + componentState.message + '</h2>');
    });
    this.layout.registerComponent('chart', (container, componentState) => {
      // let factory = this.componentFactoryResolver.resolveComponentFactory(GraphComponent);

      // var compRef = this.viewContainer.createComponent(factory);
      // container.getElement().append($(compRef.location.nativeElement));
      // compRef.instance.setEventHub(this.layout.eventHub);
      //compRef.instance.message = componentState.message;
       container.getElement().html('<h2>' + componentState.message + '</h2>');
    });

    this.layout.registerComponent('map', (container, componentState) => {
      //  let factory = this.componentFactoryResolver.resolveComponentFactory(MapComponent);
      //  var compRef = this.viewContainer.createComponent(factory);
      //  container.getElement().append($(compRef.location.nativeElement));

      // var compRef = this.viewContainer.createComponent(factory);
      // compRef.instance.message = componentState.message;
      // container.getElement().html('<h2>' + componentState.message + '</h2>');

    });

    this.layout.init();

  }

}
