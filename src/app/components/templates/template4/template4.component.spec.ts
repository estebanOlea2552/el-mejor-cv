/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Template4Component } from './template4.component';

describe('Template4Component', () => {
  let component: Template4Component;
  let fixture: ComponentFixture<Template4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
