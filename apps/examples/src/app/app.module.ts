import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxModule } from '@nrwl/nx';
import { ModalModule, ModalConfiguration, ModalSize, GLOBAL_MODAL_CONFIGURATION } from '@commons/modal';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { ModalEntryComponent } from './modal-entry/modal-entry.component';
import { ModalServiceDemo } from './modal-entry/modal-demo.service';
import { FormsModule } from '@angular/forms';
// --------------------------------------//
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorPickerTriggerDirective } from './color-picker/color-picker-trigger.directive';
import { ColorDirective } from './color-picker/color.directive';
import { ColorDemoComponent } from "./color-picker/color-demo.component";
import { AppRoutingModule } from './app-routing.module';
// --------------------------------------- //



const config: ModalConfiguration = new ModalConfiguration();


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NxModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    // cdk
    OverlayModule,
    A11yModule,
    BidiModule,
    DragDropModule,
  ],
  declarations: [
    AppComponent,
    ModalDemoComponent,
    ModalEntryComponent,
    // color cdk
    ColorPickerComponent,
    ColorPickerTriggerDirective,
    ColorDirective,
    ColorDemoComponent

  ],
  bootstrap: [
    AppComponent
  ],
  providers: [ModalServiceDemo,
    {
      provide: GLOBAL_MODAL_CONFIGURATION,
      useValue: config
    }
  ],
  entryComponents: [
    ModalEntryComponent,
    ModalDemoComponent,
    // color cdk
    ColorPickerComponent
  ]
})
export class AppModule { }
