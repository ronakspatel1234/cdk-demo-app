import { InjectionToken, ViewContainerRef } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';

/**
 * @author Ronak Patel
 * @description This file consists of the classes that will be used to set the configurations for the modal component.
 */

/**
 * @name BaseModalConfiguration
 */
export class BaseModalConfiguration {
    id?: string = '';
    position?: ModalPosition;
    direction?: Direction;
    allowBackdrop?: boolean = true;
    closeOnBackdropClick?: boolean = true;
    backdropClass?: string | string[] = '';
    width?: string = 'auto';
    height?: string = 'auto';
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string = 'auto';
    maxHeight?: string = 'auto';
    isAutoDismissible?: boolean = false;
    autoDismissTimeOut?: number = 5000;

}

/**
 * @name ModalConfiguration
 * @property size                    - user can set modal size like small, medium, large, x-large using ModalSize enum,
 *                                     by default set size = ModalSize.Medium ,type ModalSize. 
 * @property contentHeight           - user can set modal contentHeight using string with valid measurement,
 *                                     by default set contentHeight = 'auto',type string.
 * @property height                  - user can set modal height using string with valid measurement,
 *                                     by default set height ='auto' ,type string.
 * @property maxHeight               - user cane set modal maxHeight using string with valid measurement,
 *                                     by default set maxHeight ='auto' ,type string. 
 * @property width                   - user can set modal width using string with valid measurement,
 *                                     by default ste width ='auto' ,type string.
 * @property maxWidth                - user cane set modal maxWidth using string with valid measurement,
 *                                     by default set maxWidth ='auto' ,type string. 
 * @property actionButton            - user can set modal footer actionButton like isPositive action true and isNegative action true using ActionButton class,
 *                                     by default set actionButton = {isPositive: true,isNegative: true} , type ActionButton.
 * @property actionButtonText        - user can set actionButtonText like positive and negative action type string using ActionButtonText class,
 *                                     by default set actionButtonText = {positive: 'Yes',negative: 'No'} , type ActionButtonText.
 * @property actionButtonAlignment   - user can set actionButtonAlignment using ActionButtonAlignment like set start ,center,end and between position in footer,
 *                                     by default set actionButtonAlignment = ActionButtonAlignment.Center,type ActionButtonAlignment.     
 * @property isDismissible           - user can set modal dismissible or non-dismissible using boolean type,
 *                                     by default set isDismissible = true , type boolean.
 * @property isAutoDismissible       - user can set modal isAutoDismissible using boolean type,
 *                                     by default set isAutoDismissible = false , type boolean.
 * @property autoDismissTimeOut      - user can set modal autoDismissTimeOut using number type in milliseconds,
 *                                     by default set autoDismissTimeOut = 5000 milliseconds, type number.
 * @property allowBackdrop           - user can set modal allowBackdrop using boolean type,
 *                                     by default set allowBackdrop =  true, type boolean.
 */
// export class ModalConfiguration {
//     isOpen?: boolean;
//     size?: ModalSize;
//     contentHeight?: string;
//     height?: string;
//     maxHeight?: string;
//     width?: string;
//     maxWidth?: string;
//     zindex?: number;
//     actionButton?: ActionButton;
//     actionButtonText?: ActionButtonText;
//     actionButtonAlignment?: ActionButtonAlignment;
//     isDismissible?: boolean;
//     isAutoDismissible?: boolean;
//     autoDismissTimeOut?: number;
//     allowBackdrop?: boolean;
//     closeOnBackdropClick?: boolean;
//     constructor(
//         isOpen: boolean = true,
//         size: ModalSize = ModalSize.Medium,
//         contentHeight: string = 'auto',
//         height: string = 'auto',
//         maxHeight: string = 'auto',
//         width: string = 'auto',
//         maxWidth: string = 'auto',
//         zindex: number = 1000,
//         actionButton: ActionButton = {
//             isPositive: true,
//             isNegative: true
//         },
//         actionButtonText: ActionButtonText = {
//             positive: 'Yes',
//             negative: 'No'
//         },
//         actionButtonAlignment: ActionButtonAlignment = ActionButtonAlignment.Center,
//         isDismissible: boolean = true,
//         isAutoDismissible: boolean = false,
//         autoDismissTimeOut: number = 5000,
//         allowBackdrop: boolean = true,
//         closeOnBackdropClick: boolean = true
//     ) {
//         this.isOpen = isOpen;
//         this.size = size;
//         this.contentHeight = contentHeight;
//         this.height = height;
//         this.maxHeight = maxHeight;
//         this.width = width;
//         this.maxWidth = maxWidth;
//         this.zindex = zindex;
//         this.actionButton = actionButton;
//         this.actionButtonText = actionButtonText;
//         this.actionButtonAlignment = actionButtonAlignment;
//         this.isDismissible = isDismissible;
//         this.isAutoDismissible = isAutoDismissible;
//         this.autoDismissTimeOut = autoDismissTimeOut;
//         this.allowBackdrop = allowBackdrop;
//         this.closeOnBackdropClick = closeOnBackdropClick;
//     }
// }

export class ModalConfiguration extends BaseModalConfiguration {
    isOpen?: boolean = true;
    size?: ModalSize = ModalSize.Medium;
    contentHeight?: string = 'auto';
    zindex?: number = 1;
    actionButton?: ActionButton = {
        isPositive: true,
        isNegative: true
    };
    actionButtonText?: ActionButtonText = {
        positive: 'Yes',
        negative: 'No'
    };
    actionButtonAlignment?: ActionButtonAlignment = ActionButtonAlignment.Center;
    isDismissible?: boolean = true;
}

export class ModalContainerConfig<D = any> extends BaseModalConfiguration {
    viewContainerRef?: ViewContainerRef;
    data?: D | null = null;
    scrollStrategy?: ScrollStrategy;
}

/**
 * @name ModalStatus
 * @description Enum that will be used to set the Modal Status weather open or close.
 * @property Opened - to indicate modal currently opened state.  
 * @property Closed - to indicate modal currently closed state.
 */
export enum ModalStatus {
    Opened = 'opened',
    Closed = 'closed'
}

/**
 * @name ModalSize
 * @description Defines predefined size provided by component.
 * @property Small  - Provide 'small' class to modal.
 * @property Medium - Provide 'medium' class to modal.
 * @property Large - Provide 'large' class to modal.
 * @property Xlarge - Provide 'xlarge' class to modal.
 */
export enum ModalSize {
    Small = 'modal-sm',
    Medium = '',
    Large = 'modal-lg',
    Xlarge = 'modal-xl',
}

/**
 * @name ActionButton
 * @description - Create class for modal footer actionButton user can set individual isPositive and negative button true.
 * @property isPositive - to indicate positive button show in the dom, type boolean.
 * @property isNegative -  to indicate negative button show in the dom ,type boolean.
 */
export class ActionButton {
    isPositive?: boolean;
    isNegative?: boolean;
}

/**
 * @name ActionButtonText 
 * @description - Create class for modal footer actionButtonText user can set individual text for positive and negative buttons.
 * @property positive -to set text for positive button, type string.
 * @property negative -to set text for negative button, type string. 
 */
export class ActionButtonText {
    positive?: string;
    negative?: string;
}

/**
 * @name ActionButtonType
 * @description - create enum for modal footer ActionButtonType like which action perform by user.
 * @property Positive - to indicate positive action perform by user.
 * @property Negative - to indicate negative action perform by user.
 * @property Dismiss -to indicate dismiss action perform by user.
 * @property AutoDismiss -to indicate autoDismiss action perform by user.
 */
export enum ActionButtonType {
    Positive = 'positive',
    Negative = 'negative',
    Dismiss = 'dismiss',
    AutoDismiss = 'autoDismiss',
    Backdrop = 'backdrop'
}

/**
 * @name ActionButtonAlignment
 * @description - Create enum for modal footer actionButton alignment user can set individual alignment for button .
 * @property Left - provide class 'justify-content-start' for modal footer button position set left side.
 * @property Center - provide class 'justify-content-center' for modal footer button position set center.
 * @property Right - provide class 'justify-content-end' for modal footer button position set right side.
 * @property Between - provide class 'justify-content-between' for modal footer positive button left side and negative button right side.
 */
export enum ActionButtonAlignment {
    Left = 'justify-content-start',
    Center = 'justify-content-center',
    Right = 'justify-content-end',
    Between = 'justify-content-between'
}

/**
 * @name ModalTemplate
 * @description - Create enum for modal template like user can set individual template using directive. 
 * @property Header - to indicate user set header for modal template .
 * @property Body - to indicate user set body for modal body.
 * @property Footer - to indicate user set footer for modal footer.
 */
export enum ModalTemplate {
    Header = 'header',
    Body = 'body',
    Footer = 'footer'
}


export interface ModalPosition {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
}
/**
 * @description injection token for the developer to be used to create provider for custom configuration at the global level. 
 * @example 
 * A developer should use this token to pass the global level configurations. It should be either done by using it in the module's or component's providers array as shown in the example below.
 * ```
 * ...
 * // custom global level configuration to be provided
 * const config : ModalConfiguration= {
 *      size: ModalSize.Medium,
 *      actionButton: {
 *      isPositive: true,
 *      isNegative: true
 *      },
 *      actionButtonText: {
 *          positive: 'true',
 *          negative: 'false'
 *      },
 *      isDismissible: true,
 *      isAutoDismissible: false,
 *      autoDismissTimeOut: 5000,
 *      allowBackdrop: true
 * }
 * ...
 * providers: [
 *      {
 *          provide: GLOBAL_MODAL_CONFIGURATION,
 *          useValue: config
 *      }
 * ]
 */
export const GLOBAL_MODAL_CONFIGURATION = new InjectionToken<ModalConfiguration>('modalConfiguration');

export const MODAL_DATA = new InjectionToken<{}>('ModalData');



