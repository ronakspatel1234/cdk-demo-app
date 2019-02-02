import { Component, ViewChild } from "@angular/core";
import { GetModalDirective } from "./get-template.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";

/**
 * @author Ronak Patel
 * @class GetTemplateDirective
 * @description 
 */


fdescribe('GetModalDirective', () => {
  @Component({
    selector: 'app-modal',
    template: `<div *cmnModalTemplate></div>`
  })
  class MockModalComponent {
    @ViewChild(GetModalDirective) cmnModalTemplate: GetModalDirective;
  }

  let component: MockModalComponent;
  let fixture: ComponentFixture<MockModalComponent>;

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [
        GetModalDirective,
        MockModalComponent
      ]
    });
    fixture = TestBed.createComponent(MockModalComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    // Assert
    expect(component.cmnModalTemplate instanceof GetModalDirective).toBe(true);
    expect(component.cmnModalTemplate).toBeDefined();
  });

  
});