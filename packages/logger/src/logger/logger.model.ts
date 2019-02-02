/**
 * @author Sonal Prajapati
 * @description This file consists of the classes,enums and configuration that will be used to set the configurations for the logger Service.
 */
import { InjectionToken } from '@angular/core';

/**
 * @name LoggerConfiguration
 * @description This class consist the different mode. 
 * @property mode: It store the value of different mode. Like Off,Production,Devlopement,Verbose.
 */
export class LoggerConfiguration {
    mode: Mode;
}

/**
 * @description  create enum for different mode.
 * @property Development: The logger will allow to execute types of logs. Like fatal(),Error(),debug() and warning().
 * @property Production:  The logger will allow to execute only fatal().
 * @property Verbose:  The logger will allow to execute types of logs.
 *                    Like fatal(),Error(),info(),debug() and warning().
 * @property Off: The logger will not allow to execute in the off mode.
 */
export enum Mode {
    Off = 0,
    Production = 1,
    Development = 2,
    Verbose = 3
}

/**
 * @description create enum for a differnet log levels.
 * @property Fatal: check for the fatal function call or not.
 * @property Debug: check for the debug function call or not.
 * @property Warn:  check for the warn function call or not.
 * @property Error: check for the error function call or not.
 * @property Info:  check for the info function call or not.
 */
export enum LogLevel {
    Fatal = 0,
    Debug = 1,
    Warn = 2,
    Error = 3,
    Info = 4
}
/**
 * @description This variable is used to get the configuration from user.
 *               user can also override the configuration.
 * 
 * @example Mention in above code.
 * 
 * const config: LoggerConfiguration = {
 * mode: environment.loggerLevel
 * }
 * // Add into providers
 * providers: [
 *  {
 *      provide:GLOBAL_LOGGER_CONFIGURATION,
 *       useValue:config
 *  }
 * ]
 * 
 */
export const GLOBAL_LOGGER_CONFIGURATION = new InjectionToken<LoggerConfiguration>('loggerConfiguration')
