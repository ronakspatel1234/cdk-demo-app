import { Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { take } from 'rxjs/operators';
import { Directionality } from '@angular/cdk/bidi';

@Directive({
  selector: '[color-picker-trigger]'
})
export class ColorPickerTriggerDirective {
  private overlayRef: OverlayRef;

  // tslint:disable-next-line:no-input-rename
  @Input('color-picker-trigger') colorPicker: ColorPickerComponent;

  constructor(public overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private dir: Directionality) {
  }

  private init() {
    const overlayConfig: OverlayConfig =
      new OverlayConfig(<OverlayConfig>{
        hasBackdrop: true,
        direction: this.dir.value,
        backdropClass: 'cdk-overlay-transparent-background'
      });

    overlayConfig.positionStrategy = this.overlay
      .position()
      .connectedTo(this.elementRef, {
        originX: 'start',
        originY: 'bottom'
      }, {
          overlayX: 'start',
          overlayY: 'top'
        })
      .withDirection(this.dir.value);

    this.overlayRef = this.overlay.create(overlayConfig);

    this.overlayRef.backdropClick()
      .subscribe(() => {
        this.overlayRef.detach();
      });
  }

  @HostListener('click')
  click() {
    if (!this.overlayRef) {
      this.init();

    }

    this.colorPicker.valueChange
      .pipe(take(1))
      .subscribe(() => this.overlayRef.detach());

    this.overlayRef.detach();
    const picker = new TemplatePortal(this.colorPicker.template, this.viewContainerRef);
    this.overlayRef.attach(picker);
  }
}
