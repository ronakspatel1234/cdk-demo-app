/**
 * @author Ronak Patel
 * @class ModalComponent
 * @description 
 */

import { Injectable, Optional, inject, Inject, InjectionToken, Injector, TemplateRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { ModalComponent } from './modal/modal.component';
import { ModalConfiguration, GLOBAL_MODAL_CONFIGURATION, ModalContainerConfig, MODAL_DATA } from './modal/modal.model';
import { ModalContainerComponent } from './modal/container/modal-container.component';
import { ModalContainerRef } from './modal/container/modal-container-ref';
import { timer } from 'rxjs';
// --------------------------------------------- //
// your app specific imports statements



@Injectable()
export class ModalService {


    // public variables

    // private variables
    private modalRef: ModalContainerRef<any>;
    private configuration: ModalContainerConfig;

    constructor(
        private overlay: Overlay,
        private injector: Injector,
    ) {
        // initialization
    }

    // public methods
    /**
     * @name open()
     * @description 3 
     */
    public open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        data: D,
        config?: ModalContainerConfig): ModalContainerRef<T, R> {

        config = this.configDefault(config, new ModalContainerConfig());
        if (!config.data) {
            config.data = data;
        }
        const overlayRef = this.createOverlay(config);
        const modalContainer = this.attachModalContainer(overlayRef, config);
        this.modalRef = this.attachModalContent<T, R>(componentOrTemplateRef,
            modalContainer,
            overlayRef,
            config);
        return this.modalRef;
    }

    /**
    * @name close()
    * @description
    */
    public close(): ModalContainerRef<any> {
        if (this.configuration.isAutoDismissible) {
            timer(this.configuration.autoDismissTimeOut).subscribe(() => {
                this.configuration.autoDismissTimeOut = 5000;
                this.modalRef.close();
            });
        }
        return this.modalRef
    }
    private configDefault(config?: ModalContainerConfig, defaultOption?: ModalContainerConfig): ModalContainerConfig {
        return { ...defaultOption, ...config }
    }

    private attachModalContainer(overlayRef: OverlayRef, config: ModalContainerConfig): ModalContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(userInjector || this.injector, new WeakMap([
            [ModalContainerConfig, config]
        ]));
        const containerPortal = new ComponentPortal(ModalContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlayRef.attach<ModalContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    private createOverlay(config: ModalContainerConfig): OverlayRef {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    
    private getOverlayConfig(config: ModalContainerConfig): OverlayConfig {
        const state = new OverlayConfig({
            positionStrategy: this.overlay.position().global().centerHorizontally(),
            hasBackdrop: config.allowBackdrop,
            panelClass: ''
        });
        return state;
    }

    private attachModalContent<T, R>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        modalContainer: ModalContainerComponent,
        overlayRef: OverlayRef,
        config: ModalContainerConfig): ModalContainerRef<T, R> {
        this.configuration = config;
        const modalRef = new ModalContainerRef<T, R>(overlayRef, modalContainer, config.id);
        if (config.allowBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                if (config.closeOnBackdropClick) {
                    modalRef.close();
                }
            });
        }

        if (config.isAutoDismissible) {
            this.close()
        }

        if (componentOrTemplateRef instanceof TemplateRef) {
            modalContainer.attachTemplatePortal(
                new TemplatePortal<T>(componentOrTemplateRef, null!,
                    <any>{ $implicit: config.data, modalRef }));
        } else {
            const injector = this.createInjector<T>(config, modalRef, modalContainer);
            const contentRef = modalContainer.attachComponentPortal<T>(
                new ComponentPortal(componentOrTemplateRef, undefined, injector));
            modalRef.componentInstance = contentRef.instance;
        }

        modalRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);

        return modalRef;
    }


    // private methods
    // private createInjector(data): PortalInjector {

    //     const injectorTokens = new WeakMap<any, any>([
    //         [MODAL_DATA, data],
    //     ]);

    //     return new PortalInjector(this.injector, injectorTokens);
    // }

    private createInjector<T>(
        config: ModalContainerConfig,
        modalRef: ModalContainerRef<T>,
        modalContainer: ModalContainerComponent): PortalInjector {

        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;


        const injectionTokens = new WeakMap<any, any>([
            [ModalContainerComponent, modalContainer],
            [MODAL_DATA, config.data],
            [ModalContainerRef, modalRef]
        ]);

        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }
}
