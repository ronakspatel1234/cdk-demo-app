/**
 * @author Shezad Khan
 * @class CmnCoreModule
 * @description The root module of core library. All the components belonging to core library should be registered here.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitValidator } from './unit-validator/unit-validator'
// ------------------------- //

export { ObjectUtility } from './object-utility/object-utility';
export { uniqueIdProvider } from './unique-id-generator/unique-id-generator.provider';
export { Direction, DIRECTION } from './direction/direction.model';
export { Directionality } from './direction/directionality';
export { UnitValidator } from './unit-validator/unit-validator';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: []
})
export class CmnCoreModule { }