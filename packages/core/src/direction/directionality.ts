/**
 * @author Shezad Khan
 * @class Directionality
 * @description This class is responsible to change the direction value. It implements an interface called Direction which should be used as a skeleton if the developer wishes to override the properties of this class.
 * @example 
 * ```
 * export class CustomClass implements Direction {
 *  
 * }
 * ```
 */
import { BehaviorSubject } from "rxjs";
// ------------------------------------ //
import { Direction, DirectionValue } from "../direction/direction.model";

export class Directionality implements Direction {

    // a enum of type DirectionValue to store the content direction in the DOM.
    public readonly dirValue: DirectionValue;
    // a behaviour subject that stores the direction value.
    public directionChange: BehaviorSubject<DirectionValue>;

    // initializations 
    constructor() {
        this.dirValue = DirectionValue.LTR;
        this.directionChange = new BehaviorSubject<DirectionValue>(this.dirValue)
    }

    /**
     * @description This method will set the new value of the direction.
     */
    public changeDirection() {
        if (this.dirValue === DirectionValue.LTR) {
            (this as { dirValue: DirectionValue }).dirValue = DirectionValue.RTL;
        } else {
            (this as { dirValue: DirectionValue }).dirValue = DirectionValue.LTR;
        }
        this.directionChange.next(this.dirValue)
    }
}
