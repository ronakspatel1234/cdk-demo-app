import { LoggerService } from "@commons/logger";


export class OverrideService<T extends Error> extends LoggerService<T>{
    // This method is used for override the error-logger Service.
    public info(message) {
        console.info(message);
    }
    public warning(message) {
        console.warn(message);
    }

}