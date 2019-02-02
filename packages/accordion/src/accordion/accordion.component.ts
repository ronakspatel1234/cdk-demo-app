/**
 * @author Binal Lad
 * @class AccordionComponent
 * @description The root component of accordion library.
 * @example <accordion [configuration]=""></accordion>
 */

import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
// --------------------------------------------- //
// your app specific imports statements
import { AccordionConfiguration } from './accordion.model'

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cmn-accordion',
    templateUrl: './accordion.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccordionComponent implements OnInit, OnDestroy {

    // private variables for your setter getters
    // stores the default configurations for phone number input.
    private _defaultConfiguration: AccordionConfiguration;

    // stores the configurations that were passed by the parent
    private _configuration: AccordionConfiguration;

    // your getter setters logic

    /**
     * @description sets and gets the configuration that were passed by the parent and stores it in a variable that to be used throughout this class.
     * @param config configuration object that was passed by the parent.
     */
    @Input() public set configuration(config: AccordionConfiguration) {
        if (config) {
            this._configuration = Object.assign(this._defaultConfiguration, config);
        } else {
            this._configuration = Object.assign(this._defaultConfiguration);
        }
    }
    
    public get configuration(): AccordionConfiguration {
        return this._configuration;
    }

    // @Inputs


    // @Outputs


    // public variables

    // rest of your private variables

    constructor(private cdr: ChangeDetectorRef) {
        this.cdr.detach();
        // initialization

        // initialize the configurations with the default values in a variable.
        this._defaultConfiguration = {
            // your default configurations here
        }

    }

    // life cycle hooks

    ngOnInit() {

    }

    // public methods

    // private methods

    ngOnDestroy() {
        // unsubscribe all your event listeners.
    }
}
