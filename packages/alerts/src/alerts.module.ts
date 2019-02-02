/**
 * @author Binal Lad
 * @class AlertsModule
 * @description The root module of alerts library. All the components belonging to alerts library should be registered here.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------- //
import { AlertsComponent } from './alerts/alerts.component'
import { ModalComponent } from '@commons/modal/src/modal/modal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AlertsComponent],
    exports: [AlertsComponent],
    entryComponents: [ModalComponent]
})
export class AlertsModule { }