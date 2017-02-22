/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PanelsPt2Component } from './panels-pt2.component';

describe('PanelsPt2Component', () => {
  let component: PanelsPt2Component;
  let fixture: ComponentFixture<PanelsPt2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelsPt2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelsPt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
