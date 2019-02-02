import { Component, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';

@Component({
  selector: 'exm-color',
  templateUrl: './color-demo.component.html',
  styleUrls: ['./color-demo.component.css']
})

export class ColorDemoComponent {
  @ViewChild('element') element: ElementRef<HTMLElement>;

  elementOrigin = this.formatOrigin(null);

  constructor(private focusMonitor: FocusMonitor,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone) {

  }
  ngOnInit() {
    this.focusMonitor.monitor(this.element)
      .subscribe(origin => this.ngZone.run(() => {
        this.elementOrigin = this.formatOrigin(origin);
        this.cdr.markForCheck();
      }));

  }

  selectedColor = { name: 'Indigo', value: '#3F51B5' };

  colors = [
    { name: 'Red', value: '#F44336' },
    { name: 'Pink', value: '#E91E63' },
    { name: 'Purple', value: '#9C27B0' },
    { name: 'Deep Purple', value: '#673AB7' },
    this.selectedColor,
    { name: 'Blue', value: '#2196F3' },
    { name: 'Light Blue', value: '#03A9F4' },
    { name: 'Cyan', value: '#00BCD4' },
    { name: 'Teal', value: '#009688' },
    { name: 'Green', value: '#4CAF50' },
    { name: 'Light Green', value: '#8BC34A' },
    { name: 'Lime', value: '#CDDC39' },
    { name: 'Yellow', value: '#FFEB3B' },
    { name: 'Amber', value: '#FFC107' },
    { name: 'Orange', value: '#FF9800' },
    { name: 'Deep Orange', value: '#FF5722' },
    { name: 'Brown', value: '#795548' },
    { name: 'Grey', value: '#9E9E9E' },
    { name: 'Blue Grey', value: '#607D8B' }
  ];

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.element);
  }

  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + ' focused' : 'blurred';
  }

  markForCheck() {
    this.ngZone.run(() => this.cdr.markForCheck());
  }
}
