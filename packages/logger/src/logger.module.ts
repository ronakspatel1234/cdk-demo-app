/**
 * @author Sonal Prajapati
 * @class LoggerModule
 * @description The root module of logger library. All the components belonging to logger library should be registered here.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------- //
import { LoggerService } from './logger/logger.service';
// -------------------------//
export * from './logger/logger.service';
export * from './logger/logger.model';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LoggerService
    ],
})
export class LoggerModule {
}