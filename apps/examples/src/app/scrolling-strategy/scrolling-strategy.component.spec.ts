import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingStrategyComponent } from './scrolling-strategy.component';

describe('ScrollingStrategyComponent', () => {
  let component: ScrollingStrategyComponent;
  let fixture: ComponentFixture<ScrollingStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollingStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollingStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
