import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(20, 50, 200);
  }
}

@Component({
  selector: 'app-scrolling-strategy',
  templateUrl: './scrolling-strategy.component.html',
  styleUrls: ['./scrolling-strategy.component.scss'],
  providers: [{ provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }]
})
export class ScrollingStrategyComponent {
  items = Array(1000).fill(0).map(() => Math.round(Math.random() * 100));
}
