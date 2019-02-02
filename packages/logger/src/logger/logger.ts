/**
 * @author Sonal Prajapati
 * @description This class represents all the method of Logs.
 * @method info Implement this method for logging information messages.
 * @method error Implement this method for logging error messages.
 * @method warning Implement this method for logging warning messages.
 * @method debug Implement this method for logging debug messages.
 */
export interface Logger<T extends Error> {
    fatal?(message: T): void;
    info?(message: T): void;
    error?(message: T): void;
    warning?(message: T): void;
    debug?(message: T): void;
}