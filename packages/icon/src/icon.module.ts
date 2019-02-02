/**
 * @author Ashok yadav
 * @class IconModule
 * @description The root module of icon library. All the components belonging to icon library should be registered here.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------- //
import { IconComponent } from './icon/icon.component'
import { HttpClientModule } from '@angular/common/http';
import { IconregistryService } from './iconregistry.service';
import { LoggerService } from '@commons/logger'; 
import { CmnCoreModule, UnitValidator } from '@commons/core';

export { IconComponent } from './icon/icon.component';
export { IconFontAttribute } from '../src/icon/icon.model';
export { IconConfiguration } from '../src/icon/icon.model';
export { IconFontSet } from '../src/icon/icon.model';
export { IconregistryService } from '../src/iconregistry.service';
export { GLOBAL_ICON_CONFIGURATION, } from './icon/icon.model'


  
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        CmnCoreModule
    ],
    declarations: [IconComponent],
    providers: [IconregistryService,LoggerService,UnitValidator],
    exports: [IconComponent]
})
export class IconModule {
}