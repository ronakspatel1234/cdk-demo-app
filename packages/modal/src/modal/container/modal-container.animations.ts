/**
 * @author - Ronak Patel
 * @description create for modal animation .
 */
import { trigger, transition, useAnimation } from '@angular/animations';
// ----------------------------------------------------------------------------//
import { fadeInDown } from '@commons/animations/src/fade/fade.animation';


export const modalAnimation = trigger('fadeInDown', [
    transition('* => *', [
        useAnimation(fadeInDown, {
            params: {}
        })
    ]),
]);