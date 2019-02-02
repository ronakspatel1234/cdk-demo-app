/**
 * @author Ronak Patel
 * @class ModalLog
 * @description Used by 'ModalComponent' to Log message of class type.
 */
export class ModalLog extends Error {
    constructor(message: string){
        super(message);
    }
}
