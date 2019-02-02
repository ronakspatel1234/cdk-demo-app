import {
    Component,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    ViewChild,
    AfterContentInit,
} from '@angular/core';
import {
    BasePortalOutlet,
    ComponentPortal,
    CdkPortalOutlet,
    TemplatePortal
} from '@angular/cdk/portal';
import { ModalContainerConfig } from '../modal.model';
import { modalAnimation } from './modal-container.animations';
import { ChangeDetectionStrategy } from '@angular/core';
import { FocusTrapFactory } from '@angular/cdk/a11y';

@Component({
    selector: 'cmn-modal-container',
    templateUrl: 'modal-container.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [
        modalAnimation
    ],

})
export class ModalContainerComponent extends BasePortalOutlet implements AfterContentInit {
    @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

    constructor(
        private elementRef: ElementRef,
        private focusTrapFactory: FocusTrapFactory,
        private config: ModalContainerConfig) {
        super();
    }

    ngAfterContentInit() {
        this.focusTrapFactory.create(this.elementRef.nativeElement);
    }

    public attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        return this.portalOutlet.attachComponentPortal(portal);
    }

    public attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        return this.portalOutlet.attachTemplatePortal(portal);
    }
}
