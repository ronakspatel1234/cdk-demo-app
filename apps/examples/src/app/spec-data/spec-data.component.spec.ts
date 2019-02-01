import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecDataComponent } from './spec-data.component';

describe('SpecDataComponent', () => {
  let component: SpecDataComponent;
  let fixture: ComponentFixture<SpecDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
