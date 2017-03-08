import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

declare var $: any;

@Component({
  selector: 'app-date-picker',
  templateUrl: `./date-picker.component.html`,
  styles: [`#datetimepicker { width: 40%; margin: 0; }
            #calendar-holder { padding: 10px 10px}`]
})
export class DatePickerComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  datetimepicker: {};

  constructor() { }

  ngOnInit() {
   // $(document).ready(function () {
        // create DateTimePicker from input HTML element
        $("#datetimepicker").kendoDateTimePicker({
            value: new Date()
        });
   // });
   this.datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");

    function startChange() {
      this.startDate = start.value(),
      this.endDate = end.value();

      if (this.startDate) {
        this.startDate = new Date(this.startDate);
        this.startDate.setDate(this.startDate.getDate());
        end.min(this.startDate);
      } else if (this.endDate) {
        start.max(new Date(this.endDate));
      } else {
        this.endDate = new Date();
        start.max(this.endDate);
        end.min(this.endDate);
      }
    }

    function endChange() {
      var endDate = end.value(),
        startDate = start.value();

      if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate());
        start.max(endDate);
      } else if (startDate) {
        end.min(new Date(startDate));
      } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
      }
    }

   // var today = kendo.date.today();
   var today = new Date();
   var prevDate: Date;
  // prevDate = today-1;

    var start = $("#start").kendoDateTimePicker({
      value: today,
      change: startChange,
      timeFormat: "HH:mm",
      format: "M/d/yyyy HH:mm",
      parseFormats: ["MM/dd/yyyy"]
    }).data("kendoDateTimePicker");

    var end = $("#end").kendoDateTimePicker({
      value: today,
      change: endChange,
      parseFormats: ["MM/dd/yyyy"]
    }).data("kendoDateTimePicker");

    start.max(end.value());
    end.min(start.value());
 // });
}

}
