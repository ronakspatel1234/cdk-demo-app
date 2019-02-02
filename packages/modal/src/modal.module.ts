/**
 * @author Ronak Patel
 * @class ModalModule
 * @description The root module of modal library. All the components belonging to modal library should be registered here.
 */
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------------------------//
import { OverlayModule } from '@angular/cdk/overlay';
import { BidiModule } from '@angular/cdk/bidi';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
// ------------------------- //
import { ModalComponent } from './modal/modal.component';
import { GetModalDirective } from './modal/directives/get-template.directive';
import { LoggerModule } from '@commons/logger';
import { ModalService } from './modal.service';
import { ModalContainerComponent } from './modal/container/modal-container.component';

// ----------------------------//
export { ModalConfiguration, ModalSize, ModalStatus, ActionButton, ModalTemplate, ActionButtonText, GLOBAL_MODAL_CONFIGURATION, MODAL_DATA } from './modal/modal.model'

@NgModule({
    imports: [
        CommonModule,
        LoggerModule,
        OverlayModule,
        PortalModule,
        BidiModule,
        A11yModule
    ],
    declarations: [
        ModalComponent,
        GetModalDirective,
        ModalContainerComponent
    ],
    exports: [
        ModalComponent,
        GetModalDirective,

    ],
    entryComponents: [
        ModalContainerComponent
    ]
})
export class ModalModule {
    constructor(@Optional() @SkipSelf() parentModule: ModalModule) {
        if (parentModule) {
            throw new Error(
                'ModalModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        }
    }
}
