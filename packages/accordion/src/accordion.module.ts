/**
 * @author Binal Lad
 * @class AccordionModule
 * @description The root module of accordion library. All the components belonging to accordion library should be registered here.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------- //
import { AccordionComponent } from './accordion/accordion.component'

@NgModule({
    imports: [CommonModule],
    declarations: [AccordionComponent],
    exports: [AccordionComponent]
})
export class AccordionModule {}