/**
 * @author Sonal Prajapati
 * @class LoggerService
 * @description This class represent the different type of logs based on the modes.
 */

import { Inject, Optional } from '@angular/core';
// --------------------------------------------- //
import { Logger } from './logger';
import { GLOBAL_LOGGER_CONFIGURATION, LoggerConfiguration, LogLevel, Mode } from './logger.model';

export class LoggerError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/**
 * T type represents is not a vlaue type but a more complex type. like class or interface .
 * T which is extend from the Error interface, based on the user value user will get the type of error.
 */
export class LoggerService<T extends Error> implements Logger<T> {
    // store configuration value.
    private configuration: LoggerConfiguration;
    constructor(@Optional() @Inject(GLOBAL_LOGGER_CONFIGURATION) public globalConfiguration: LoggerConfiguration) {

        //check cofiguration and store the value of the configuration.
        this.configuration = {
            mode: Mode.Verbose
        }
        // Invocation of this method is not tested.
        this.configureLogger();
    }
    // set configuration baesd on the global configuration.
    public configureLogger(): void {
        // check the global configuration is store.
        if (this.globalConfiguration) {
            // check the property of mode in global configuration.
            if (this.globalConfiguration.hasOwnProperty('mode')) {
                // check the global configuration mode value in enum.
                if (Object['values'](Mode).includes(this.globalConfiguration.mode)) {
                    this.configuration = { ...this.configuration, ...this.globalConfiguration }
                }
                // if global configuration mode value is note valid then throw error.
                else {
                    throw new LoggerError('Unexpected mode value encountered in LoggerService, please pass an Enum of type Mode');
                }
            }
            // if the property of mode in global configuration is not avavilable then throw the error.
            else {
                throw new LoggerError('Unexpected key in configuration object of LoggerService, the service should be of type LoggerConfiguration');
            }
        }
    }

    /**
     * @description This method gets the value from the user and store in the message and throw the error and stop the execution. Fatal will be logged on if the mode is all modes.checkconfiguration check and check wich method is execute using loglevel enum 
     * @param message: This message will throw the error which is passed by the user.
     */
    public fatal(message: T): void {
        if (this.checkConfiguration(LogLevel.Fatal)) {
            throw this.toString(message);
        }
    }

    /**
     * @description This method get the value from the user and store in the message and console the info. info will be logged on if the mode is verbose.
     * @param message : The message is parameter which accept the 'T' type.
     */
    public info(message: T): void {
        if (this.checkConfiguration(LogLevel.Info)) {
            console.info(this.toString(message));
        }
    }

    /**
    * @description This method get the value from the user and store in the message and console the warning. warning will be logged on if the mode is Devlopmenet or Verbose.checkconfiguration check and check wich method is execute using loglevel enum 
    * @param message : The message is parameter which accept the 'T' type.
    */
    public warning(message: T): void {
        if (this.checkConfiguration(LogLevel.Warn)) {
            console.warn(this.toString(message));
        }
    }

    /**
     * @description This method get the value from the user and store in the message and console the error. error will be logged on if the mode is  Devlopment or Verbose.checkconfiguration check and check wich method is execute using loglevel enum 
     * @param message : The message is parameter which accept the 'T' type.
     */
    public error(message: T): void {
        if (this.checkConfiguration(LogLevel.Error)) {
            console.error(this.toString(message));
        }
    }

    /**
     * @description This method get the value from the user and store in the message and console the debug.
     *  debug will be logged on if the mode is Devlopment or Verbose.checkconfiguration check and check wich method is execute using loglevel enum 
     * @param message : The message is parameter which accept the 'T' type.
     */
    public debug(message: T): void {
        if (this.checkConfiguration(LogLevel.Debug)) {
            console.debug(this.toString(message));
        }
    }

    /**
     * @description This method checks the configuration that is passed by the user and based on the configuration also checks the logLevel and returns the boolean type.
     * @param level: Store the logLevel and based on the log level which method call by the user.
     */
    private checkConfiguration(level: LogLevel): boolean {
        if (this.configuration.mode > Mode.Off && level === LogLevel.Fatal) {
            return true;
        } else if (this.configuration.mode >= Mode.Development && (level === LogLevel.Debug || level === LogLevel.Error || level === LogLevel.Warn)) {
            return true;
        } else if (this.configuration.mode === Mode.Verbose && level === LogLevel.Info) {
            return true;
        }
        return false;
    }

    /**
     * @description This method is used for check the browser and convert the message into a string based on the browser and return string type or Error Type.
     * @param messageObj: get the value which is passed by user and based on the browser change the message into the string.
     */
    private toString(messageObj: T):T|string {
        let message: string;
        // cheack for the IE browser using RegExp and set message and return.
        if (/Trident\//i.test(window.navigator.userAgent)) {
            message = 'Error:' + messageObj.message;
            return message;
        }
        // check for the Edge browser using RegExp and set message and return.
        else if (/Edge\//i.test(window.navigator.userAgent)) {
            message = messageObj.stack;
            return message;
        }
        // check for the Chrome browser using RegExp and return messageObj. 
        else if (/Chrome\//.test(window.navigator.userAgent)) {
            return messageObj;
        }
        // check for the Safari browser using RegExp and set message and return.
        else if (/Safari\//.test(window.navigator.userAgent)) {
            message = 'Error:' + messageObj.message;
            return message;
        }
        return messageObj;
    }
}