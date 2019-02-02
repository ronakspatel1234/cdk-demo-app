/**
 * @author Binal Lad
 * @class AlertsComponent
 * @description The root component of alerts library.
 * @example <alerts [configuration]=""></alerts>
 */

import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
// --------------------------------------------- //
// your app specific imports statements
import { AlertsConfiguration } from './alerts.model'

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cmn-alerts',
    templateUrl: './alerts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertsComponent implements OnInit, OnDestroy {

    // private variables for your setter getters
    // stores the default configurations for phone number input.
    private _defaultConfiguration: AlertsConfiguration;

    // stores the configurations that were passed by the parent
    private _configuration: AlertsConfiguration;

    // your getter setters logic

    /**
     * @description sets and gets the configuration that were passed by the parent and stores it in a variable that to be used throughout this class.
     * @param config configuration object that was passed by the parent.
     */
    @Input() public set configuration(config: AlertsConfiguration) {
        if (config) {
            this._configuration = Object.assign(this._defaultConfiguration, config);
        } else {
            this._configuration = Object.assign(this._defaultConfiguration);
        }
    }
    
    public get configuration(): AlertsConfiguration {
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
