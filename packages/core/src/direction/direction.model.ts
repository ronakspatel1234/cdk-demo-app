/**
 * @author Shezad Khan
 * @description this model file consists of:
 * 1. an enum that will be used by the component to set the direction value.
 * 2. an interface that will be implemented to override the Directionality class's members and methods.
 * 3. an injection token that will be used to provide Directionality class to other classes.
 */
import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/**
 * @name DirectionValue
 * @description Enum for setting the direction value of the component.
 * @property LTR: sets the content direction from left to right
 * @property RTL: sets the content direction from right to left.
 */
export enum DirectionValue {
    LTR = 'ltr',
    RTL = 'rtl'
}

/**
 * @name Direction
 * @description This interface can be implemented by any class set the action to its members and methods.
 */
export interface Direction {
    dirValue: DirectionValue;
    directionChange: BehaviorSubject<DirectionValue>
    changeDirection: () => void
}

/**
 * @description This token will be injected to the component in order to change the content's direction using the Directionality class.
 * @example 
 * ```ts
 * providers: [
 *      {
            provide: DIRECTION,
            useClass: Directionality
        }
    ]

    ....
    ....

    export class Component {
        constructor(
            @Inject(DIRECTION) private direction: Directionality
        ) { }
        changeDir() {
            // this will change the direction from `ltr` to `rtl` and vice versa.
            this.direction.changeDirection();
        }
    }

 * ```
 */
export const DIRECTION = new InjectionToken<Direction>('direction');
