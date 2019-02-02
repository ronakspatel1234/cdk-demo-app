/**
 * @author Sonal Prajapati
 * @class LoggerService
 * @description A spec file which holds the test cases for LoggerService.
 */
import { TestBed } from '@angular/core/testing';
// -------------------------------------//
import { LoggerService } from './logger.service';
import { GLOBAL_LOGGER_CONFIGURATION, LogLevel, Mode, LoggerConfiguration } from './logger.model';
import { ValueProvider } from '@angular/core';

// xdescribe('LoggerService', () => {
//   let service: LoggerService<Error>;
//   // enum is create for execute the the private method.
//   enum LoggerServicePrivateMethods {
//     checkConfiguration = 'checkConfiguration',
//     toString = 'toString',
//     configuration = 'configuration'
//   }

//   /**
//    * @description Set the by defualt configuration
//    * @param globalConfigProvider : by defualt set globalconfiguration and set local configuration.
//    * Ternaryoperator: by defualt  globalconfiguration when get local configuration then it will pass it.
//    */
//   function createConfiguration(globalConfigProvider?:ValueProvider) {
//     TestBed.configureTestingModule({
//       providers: (globalConfigProvider)
//         ? [LoggerService, globalConfigProvider]
//         : [LoggerService]
//     })
//   }
// /**
//  * @description get the instance from the service and it execute in every describe.
//  * @param globalConfigProvider : pass the configuration.
//  */
//   function executePrerequisite(globalConfigProvider?) {
//     createConfiguration(globalConfigProvider);
//     service = TestBed.get(LoggerService);
//   }

//   describe('configuration', function () {
//     it('should check configuration define', function () {
//       // Arrange
//       executePrerequisite();
//       // Assert
//       expect(service[LoggerServicePrivateMethods.configuration]).toBeTruthy();
//     });

//     it('should check congigureLogger define', function () {
//       // Arrange 
//       executePrerequisite();
//       // Assert
//       expect(service.configureLogger).toBeDefined();
//     });

//     it('should set configuration equal the object passed in global configuration', function () {
//       // Arrange
//       const globalConfig: LoggerConfiguration = {
//         mode: Mode.Verbose
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: globalConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.configuration]).toEqual(globalConfig);
//     });

//     it('should check globalConfiguration hasOwnProperty(mode) and throw Error', function () {
//       // Arrange
//       const message = new Error('Unexpected key in configuration object of LoggerService, the service should be of type LoggerConfiguration');
//       const globalConfig = {
//         mode1: Mode.Verbose
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: globalConfig
//       };

//       try {
//         // Act
//         executePrerequisite(globalConfigProvider);
//       } catch (e) {
//         // Assert
//         expect(e).toEqual(message);
//       }
//     });

//     it('should check Mode enum includes globalConfiguration.mode and throw Error', function () {
//       // Arrange
//       const message = new Error('Unexpected mode value encountered in LoggerService, please pass an Enum of type Mode');
//       const globalConfig = {
//         mode: ''
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: globalConfig
//       };

//       try {
//         // Act
//         executePrerequisite(globalConfigProvider);
//       } catch (e) {
//         // Assert
//         expect(e).toEqual(message);
//       }
//     });
//   });

//   describe('Fatal', function () {
//     // Arrange
//     let message: Error;
//     message = new Error('fatal');

//     it('should check the fatal() define', function () {
//       // Arrange
//       executePrerequisite();
//       // Assert
//       expect(service.fatal).toBeDefined();
//     });

//     it('should check fatal() accepts a parameter of a type that extends Error', function () {
//       // Arrange
//       spyOn(service, 'fatal');

//       //  Act
//       service.fatal(message);

//       // Assert
//       expect(service.fatal).toHaveBeenCalledWith(message);

//     });
//     it('should check checkConfiguration() is invoked with LogLevel.fatal', function () {
//       // Arrange
//       const spy = spyOn<any>(service, 'checkConfiguration');

//       // Act
//       service.fatal(message);
//       // Assert
//       expect(spy).toHaveBeenCalledWith(LogLevel.Fatal);
//     });

//     it('should check fatal() throw message', () => {
//       try {
//         // Act
//         service.fatal(message);
//       } catch (e) {
//         // Assert
//         expect(e).toEqual(message);
//       }

//     });
//   });
//   describe('Info', function () {
//     // Arrange
//     let message: Error;
//     message = new Error('info');

//     it('should check the info() define', function () {
//       // Assert
//       expect(service.info).toBeDefined();
//     });

//     it('should check info() parameter of type Error', function () {
//       // Arrange
//       spyOn(service, 'info');

//       //  Act
//       service.info(message);

//       // Assert
//       expect(service.info).toHaveBeenCalledWith(message);

//     });

//     it('should check checkConfiguration() execute with LogLevel.Info', function () {
//       // Arrange
//       const spy = spyOn<any>(service, 'checkConfiguration');

//       // Act
//       service.info(message);

//       // Assert
//       expect(spy).toHaveBeenCalledWith(LogLevel.Info);
//     });

//     it('should check console.info() is invoked', function () {
//       // Arrange
//       spyOn(console, 'info');

//       // Act
//       service.info(message);

//       // Assert
//       expect(console.info).toHaveBeenCalled();
//     });

//     it('should check toString() executes', function () {
//       // Arrange
//       spyOn(console, 'info');

//       // Act
//       service.info(message);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.toString]).toBeDefined();
//     });

//     it(`should invoke console.info() with toString()'s return value`, function () {
//       // Arrange
//       spyOn(console, 'info');
//       const messageToLog = service[LoggerServicePrivateMethods.toString](message);

//       // Act
//       service.info(message);

//       // Assert
//       expect(console.info).toHaveBeenCalledWith(messageToLog);
//     });
//   });
//   describe('warning', function () {

//     // Arrange
//     let message: Error;
//     message = new Error('warning');

//     it('should check the warning() define ', function () {
//       // Assert
//       expect(service.warning).toBeDefined();
//     });

//     it('should pass the parameter of type Error', function () {
//       // Arrange
//       spyOn(service, 'warning');

//       //  Act
//       service.warning(message);
//       // Assert
//       expect(service.warning).toHaveBeenCalledWith(message);
//     });

//     it('should check checkConfiguration() execute with LogLevel.warn', function () {
//       // Arrange
//       const spy = spyOn<any>(service, 'checkConfiguration');

//       // Act
//       service.warning(message);
//       // Assert
//       expect(spy).toHaveBeenCalledWith(LogLevel.Warn);
//     });

//     it('should check console.warning() invoked', function () {
//       // Arrange
//     const spy=  spyOn(console, 'warn');

//       // Act
//       service.warning(message);

//       // Assert
//       expect(spy).toHaveBeenCalled();
//     });

//     it('should check toString() executes', function () {
//       // Arrange
//       spyOn(console, 'warn');

//       // Act
//       service.warning(message);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.toString]).toBeDefined();
//     });

//     it(`should invoke console.warning() with toString()'s  return value`, function () {
//       // Arrange
//       spyOn(console, 'warn');
//       const messageToLog = service[LoggerServicePrivateMethods.toString](message);

//       // Act
//       service.warning(message);

//       // Assert
//       expect(console.warn).toHaveBeenCalledWith(messageToLog);
//     });
//   });
//   describe('Error', function () {
//     // Arrange
//     let message: Error;
//     message = new Error('error');

//     it('should check the error() define', function () {
//       // Assert
//       expect(service.error).toBeDefined();
//     });

//     it('should check error() parameter of type Error', function () {
//       // Arrange
//       spyOn(service, 'error');

//       //  Act
//       service.error(message);

//       // Assert
//       expect(service.error).toBeDefined();
//     });

//     it('should check checkConfiguration() execute with LogLevel.Error', function () {
//       // Arrange
//       const spy = spyOn<any>(service, 'checkConfiguration');

//       // Act
//       service.error(message);
//       // Assert
//       expect(spy).toHaveBeenCalledWith(LogLevel.Error);
//     });

//     it('should check console.error() invoked', function () {
//       // Arrange
//       spyOn(console, 'error');

//       // Act
//       service.error(message);

//       // Assert
//       expect(console.error).toHaveBeenCalled();
//     });

//     it('should check toString() executes', function () {
//            // Act
//       service.error(message);
//       // Assert
//       expect(service[LoggerServicePrivateMethods.toString]).toBeDefined();
//     });

//     it(`should invoke console.error() with toString()'s return value`, function () {
//       // Arrange
//       spyOn(console, 'error');
//       const messageToLog = service[LoggerServicePrivateMethods.toString];

//       // Act
//       service.error(message);

//       // Assert
//       expect(console.error).toHaveBeenCalledWith(message);
//     });
//   });

//   describe('Debug', function () {
//     // Arrange
//     let message: Error;
//     message = new Error('debug');

//     it('should check Debug() define', function () {
//       // Assert

//       expect(service.debug).toBeDefined();
//     });

//     it('should check debug() parameter of type Error', function () {
//       // Arrange
//       spyOn(service, 'debug')

//       // Act
//       service.debug(message);

//       // Assert
//       expect(service.debug).toBeDefined();
//     });

//     it('should check checkConfiguration() executes with LogLevel.debug', function () {
//       // Arrange
//       const spy = spyOn<any>(service, 'checkConfiguration');

//       // Act
//       service.debug(message);

//       // Assert
//       expect(spy).toHaveBeenCalledWith(LogLevel.Debug);
//     });

//     it('should check console.debug() invoked', function () {
//       // Arrange
//       spyOn(console, 'debug');

//       // Act
//       service.debug(message);

//       // Assert
//       expect(console.debug).toHaveBeenCalled();
//     });

//     it('should check toString() executes', function () {
//       // Arrange
//       spyOn(console, 'debug');

//       // Act
//       service.debug(message);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.toString]).toBeDefined();
//     });

//     it(`should invoke console.debug() with toString()'s return value`, function () {
//       // Arrange
//       spyOn(console, 'debug');
//       const messageToLog = service[LoggerServicePrivateMethods.toString](message);

//       // Act
//       service.debug(message);

//       // Assert
//       expect(console.debug).toHaveBeenCalledWith(messageToLog);
//     });
//   });

//   describe('checkConfiguration', function () {


//     it('should check the checkConfiguration() define ', function () {
//       // Arrange
//       executePrerequisite();

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration]).toBeDefined();
//     });

//     it('should accept a parameter of type LogLevel', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Fatal;
//       executePrerequisite();
//       const spy = spyOn<any>(service, 'checkConfiguration');

//       // Act
//       service[LoggerServicePrivateMethods.checkConfiguration](level);

//       // Assert
//       expect(spy).toHaveBeenCalledWith(level);
//     });
//     // Mode.verbose.
//     it('should return true for Fatal messages when the mode is set to Verbose.', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Fatal;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Verbose
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return true for Debug messages when the mode is set to Verbose.  ', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Debug;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Verbose
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };

//       executePrerequisite(globalConfigProvider);
//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return true for Warn messages when the mode is set to Verbose. ', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Warn;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Verbose
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);
//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return true for Error messages when the mode is set to Verbose. ', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Error;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Verbose
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return true for Info messages when the mode is set to Verbose.', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Info;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Verbose
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     // Mode.Development
//     it('should return true for Fatal messages when the mode is set to Devlopement.', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Fatal;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Development
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return true for Debug messages when the mode is set to Devlopement.', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Debug;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Development
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return true for Warn messages when the mode is set to Devlopement.', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Warn;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Development
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return true for Error messages when the mode is set to Devlopement.', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Error;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Development
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return false for Info messages when the mode is set to Devlopement. ', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Info;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Development
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(false);
//     });
//     // Mode.Production
//     it('should return true for Fatal messages when the mode is set to Production.', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Fatal;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Production
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(true);
//     });

//     it('should return false for Debug messages when the mode is set to Production. ', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Debug;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Production
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(false);
//     });

//     it('should return false for Warn messages when the mode is set to Production. ', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Warn;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Production
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(false);
//     });

//     it('should return false for Error messages when the mode is set to Production. ', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Error;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Production
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(false);
//     });

//     it('should return false for Info messages when the mode is set to Production. ', function () {
//       // Arrange
//       let level: LogLevel;
//       level = LogLevel.Info;
//       const localConfig: LoggerConfiguration = {
//         mode: Mode.Production
//       };
//       const globalConfigProvider = {
//         provide: GLOBAL_LOGGER_CONFIGURATION,
//         useValue: localConfig
//       };
//       executePrerequisite(globalConfigProvider);

//       // Assert
//       expect(service[LoggerServicePrivateMethods.checkConfiguration](level)).toBe(false);
//     });

//   });
//   describe('toString', function () {
//     // Arrange
//     let message: Error;
//     message = new Error('info');

//     it('should check the toString() define', function () {
//       // Arrange
//       executePrerequisite();

//       // Assert
//       expect(service[LoggerServicePrivateMethods.toString]).toBeDefined();
//     });

//     it('should invoke toString with a parameter of Error Type', function () {

//       const spy = spyOn<any>(service, 'toString');

//       // Act
//       service[LoggerServicePrivateMethods.toString](message);

//       // Assert
//       expect(spy).toHaveBeenCalledWith(message);
//     });

//     it('should return message for IE browser', function () {
//       // Arrange
//       spyOnProperty(window.navigator, 'userAgent').and.returnValue('Trident/');

//       // Act
//       const returnValue = service[LoggerServicePrivateMethods.toString](message);

//       // Assert
//       expect(returnValue).toEqual('Error:' + message.message);
//     });
//     it('should return Error stack for Edge browser', function () {
//       // Arrange
//       spyOnProperty(window.navigator, 'userAgent').and.returnValue('Edge/');

//       // Act
//       const returnValue = service[LoggerServicePrivateMethods.toString](message);

//       // Assert
//       expect(returnValue).toEqual(message.stack);
//     });

//     it('should return actual Error object for Chrome browser', function () {
//       // Arrange
//       spyOnProperty(window.navigator, 'userAgent').and.returnValue('Chrome/');

//       // Act
//       const returnValue = service[LoggerServicePrivateMethods.toString](message);

//       // Assert
//       expect(returnValue).toBe(message);
//     });
//     it('should return message for Safari browser', function () {
//       // Arrange
//       spyOnProperty(window.navigator, 'userAgent').and.returnValue('Safari/');

//       // Act
//       const returnValue = service[LoggerServicePrivateMethods.toString](message);

//       // Assert
//       expect(returnValue).toBe('Error:' + message.message);
//     });

//     it('should return actual Error object for mozila browser', function () {
//       // Arrange
//       spyOnProperty(window.navigator, 'userAgent').and.returnValue('Firefox/');

//       // Act
//       const returnValue = service[LoggerServicePrivateMethods.toString](message);

//       // Assert
//       expect(returnValue).toBe(message);
//     });
//   });
// });
