/**
 * @author Ronak Patel
 * @class ModalComponent
 * @description The root component of modal library.
 * @example <modal [configuration]=""></modal>
 */

import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    OnDestroy,
    ChangeDetectorRef,
    ViewChild,
    ViewContainerRef,
    QueryList,
    ContentChildren,
    Optional,
    Inject,
    Output,
    EventEmitter,
    Renderer2,
    ElementRef,
    AfterContentInit,
    TemplateRef,
} from '@angular/core';
// import { timer } from 'rxjs/observable/timer';
import { timer, BehaviorSubject, Observable, defer, interval } from 'rxjs';
// --------------------------------------------- //
// your app specific imports statements
import { ModalConfiguration, ModalSize, ModalTemplate, ActionButton, GLOBAL_MODAL_CONFIGURATION, ActionButtonType, ModalStatus, ActionButtonText, ActionButtonAlignment } from './modal.model'
import { GetModalDirective } from './directives/get-template.directive';
import { ObjectUtility, UnitValidator } from '@commons/core';
import { modalAnimation } from './modal.component.animations';
import { LoggerService } from '@commons/logger';
import { ModalLog } from './modal.log';
import { withLatestFrom, filter, take, map, share } from 'rxjs/operators';
import { ModalService } from '../modal.service';
import { OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cmn-modal',
    templateUrl: './modal.component.html',
    animations: [
        modalAnimation
    ],
    exportAs: 'modal',
    // changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalComponent implements OnInit, OnDestroy, AfterContentInit {


    // private variables for your setter getters
    // stores the default configurations for phone number input.
    private _defaultConfiguration: ModalConfiguration;

    // stores the configurations that were passed by the user
    private _configuration: ModalConfiguration;

    // store the status thats indicates modal open or close.
    private _status: ModalStatus;
    // create for promise resolve.
    private asyncStatusResolve: (value?: ActionButtonType | PromiseLike<ActionButtonType>) => void;
    // create for promise reject.
    private asyncStatusReject: (reason?: ActionButtonType) => void;
    //
    private timerInstance: any;
    private modalTimer: { paused: BehaviorSubject<boolean>; obs: { stepTimer: Observable<any> } };


    // your getter setters logic
    /**
     * @name configuration
     * @description sets and gets the configuration that were passed by the user and check validation and  stores it in a variable that to be used throughout this class.
     * @param config configuration object that was passed by the user.
     */
    @Input() public set configuration(config: ModalConfiguration) {
        if (!config) return;
        this.validateConfiguration(config, this._defaultConfiguration);
        this._configuration = { ...this._defaultConfiguration, ...config };
    }

    public get configuration(): ModalConfiguration {
        return this._configuration;
    }

    /**
     * @name status
     * @description user can set and get status using ModalStatus enum.
     * @param modalStatus - store value type ModalStatus pass by user.
     */
    @Input() public set status(modalStatus: ModalStatus) {
        if (!modalStatus) return;
        this._status = modalStatus;
    }
    public get status(): ModalStatus {
        return this._status;
    }

    /**
     * @name size
     * @description user can set and get size using ModalSize enum.
     * @param modalSize - store value type ModalSize pass by user.
     */
    public set size(modalSize: ModalSize) {
        if (!modalSize) return;
        this._configuration.size = modalSize;
    }
    public get size(): ModalSize {
        return this._configuration.size;
    }

    /**
     * @name height
     * @description user can set and get height using string with valid measurement.
     * @param modalHeight - store value type string pass by user and check measurement for height and store in configuration.
     */
    public set height(modalHeight: string) {
        // utility function for uintValidation , based on the function ternary operator work.
        (UnitValidator.unitValidate(modalHeight)) ?
            this._configuration.height = modalHeight :
            this.loggerService.error(new ModalLog('measurement for height is not valid '));
    }
    public get height(): string {
        return this._configuration.height;
    }

    /**
     * @name maxHeight
     * @description user can set and get maxHeight using string with valid measurement.
     * @param modalMaxHeight- store value type string pass by user and check measurement for maxHeight and store in configuration. 
     */
    public set maxHeight(modalMaxHeight: string) {
        // utility function for uintValidation , based on the function ternary operator work.
        (UnitValidator.unitValidate(modalMaxHeight)) ?
            this._configuration.maxHeight = modalMaxHeight :
            this.loggerService.error(new ModalLog('measurement for maxHeight is not valid '));
    }
    public get maxHeight(): string {
        return this._configuration.maxHeight;
    }

    /**
     * @name width
     * @description user can set and get width using string with valid measurement.
     * @param modalWidth - store value type string pass by user and check measurement for width and store in configuration.
     */
    public set width(modalWidth: string) {
        // utility function for uintValidation , based on the function ternary operator work.
        (UnitValidator.unitValidate(modalWidth)) ?
            this._configuration.width = modalWidth :
            this.loggerService.error(new ModalLog('measurement for width is not valid '));
    }
    public get width(): string {
        return this._configuration.width;
    }

    /**
     * @name maxWidth
     * @description user can set and get maxWidth using string with valid measurement.
     * @param modalMaxWidth - store value type string pass by user and check measurement for maxWidth and store in configuration.
     */
    public set maxWidth(modalMaxWidth: string) {
        // utility function for initValidation , based on the function ternary operator work.
        (UnitValidator.unitValidate(modalMaxWidth)) ?
            this._configuration.maxWidth = modalMaxWidth :
            this.loggerService.error(new ModalLog('measurement for maxWidth is not valid '));
    }
    public get maxWidth(): string {
        return this._configuration.maxWidth;
    }

    /**
     * @name zindex
     * @description user can set and get zindex using string with valid measurement.
     * @param sore value type string pass by user and check measurement for zindex and store in configuration.
     */
    public set zindex(modalZindex: number) {
        if (!modalZindex) return;
        this._configuration.zindex = modalZindex
        // this.loggerService.error(new ModalLog('measurement for zindex is not valid'))
    }
    public get zindex(): number {
        return this._configuration.zindex;
    }

    /**
     * @name actionButton
     * @description user can set and get actionButton using ActionButton class .
     * @param modalActionButton - store value type ActionButton pass by user and store in configuration.
     */
    public set actionButton(modalActionButton: ActionButton) {
        if (!modalActionButton) return;
        this._configuration.actionButton = modalActionButton;
    }
    public get actionButton(): ActionButton {
        return this._configuration.actionButton;
    }

    /**
     * @name actionButtonText
     * @description user can set and get actionButtonText using ActionButtonTest class .
     * @param modalActionButtonText - store value type ActionButtonText pass by user and store in configuration.
     */
    public set actionButtonText(modalActionButtonText: ActionButtonText) {
        if (!modalActionButtonText) return;
        this._configuration.actionButtonText = modalActionButtonText;
    }
    public get actionButtonText(): ActionButtonText {
        return this._configuration.actionButtonText;
    }

    /**
     * @name actionButtonAlignment
     * @description user can set snd get actionButtonAlignment using ActionButtonAlignment enum.
     * @param  modalActionButtonAlignment - store value type ActionButtonAlignment pass by user and store in configuration.
     */
    public set actionButtonAlignment(modalActionButtonAlignment: ActionButtonAlignment) {
        if (!modalActionButtonAlignment) return;
        this._configuration.actionButtonAlignment = modalActionButtonAlignment;
    }
    public get actionButtonAlignment(): ActionButtonAlignment {
        return this._configuration.actionButtonAlignment;
    }

    /**
     * @name isDismissible
     * @description user can set and get isDismissible using boolean.
     * @param - store value type boolean pass by user and store in configuration.
     */
    public set isDismissible(modalIsDismissible: boolean) {
        if (!modalIsDismissible) return;
        this._configuration.isDismissible = modalIsDismissible;
    }
    public get isDismissible(): boolean {
        return this._configuration.isDismissible;
    }

    /**
     * @name isAutoDismissible
     * @description user can set and get isAutoDismissible using boolean.
     * @param 
     */
    public set isAutoDismissible(modalIsAutoDismissible: boolean) {
        if (!modalIsAutoDismissible) return;
        this._configuration.isAutoDismissible = modalIsAutoDismissible;
    }
    public get isAutoDismissible(): boolean {
        return this._configuration.isAutoDismissible;
    }

    /**
     * @name allowBackdrop
     * @description user can set and get allowBackdrop using boolean.
     * @param modalAllowBackdrop - store value type boolean pass by user and store in configuration.
     */
    public set allowBackdrop(modalAllowBackdrop: boolean) {
        if (!modalAllowBackdrop) return;
        this._configuration.allowBackdrop = modalAllowBackdrop;
    }
    public get allowBackdrop(): boolean {
        return this._configuration.allowBackdrop;
    }

    /**
     * @name closeOnBackdropClick
     * @description user can set and get closeOnBackdropClick using boolean.
     * @param
     */
    public set closeOnBackdropClick(modalCloseOnBackdropClick: boolean) {
        if (!modalCloseOnBackdropClick) return;
        this._configuration.closeOnBackdropClick = modalCloseOnBackdropClick;
    }
    public get closeOnBackdropClick(): boolean {
        return this._configuration.closeOnBackdropClick;
    }

    /**
     * @name content
     * @description user can get modal template using content method.
     */
    public get content(): ElementRef {
        return this.modalTemplateRef;
    }

    // @Outputs 
    // Emit when component initialized.
    @Output() initialized = new EventEmitter<boolean>();
    // Emit when modal status change like open and close.
    @Output() statusChange = new EventEmitter<ModalStatus>();
    // Emit when modal dismiss button clicked.
    @Output() dismiss = new EventEmitter<ActionButtonType>();
    // Emit when modal positive action performed.
    @Output() positiveAction = new EventEmitter<ActionButtonType>();
    // Emit when modal negative action performed.
    @Output() negativeAction = new EventEmitter<ActionButtonType>();
    // Emit when modal autoDismiss.
    @Output() autoDismiss = new EventEmitter<ActionButtonType>();
    // Emit when modal backdrop click.
    @Output() backdropClick = new EventEmitter<ActionButtonType>();

    // public variables
    /**
     * when positive and negative action perform Promise is resolved and when dismiss and autoDismiss action perform Promise is reject store in asyncStatus.
     * user can get promise resolve using asyncStatus.then() and promise reject using asyncStatus.catch().
     */
    public asyncStatus: Promise<any>;
    // modal open and close using boolean.
    public isOpen: boolean;
    // private variables    

    // content reference of modal template pass by user.
    @ContentChildren(GetModalDirective) public modalTemplate: QueryList<GetModalDirective>;

    // child reference of the modal content
    // reference for header.
    @ViewChild('modalHeaderRef', { read: ViewContainerRef }) public modalHeaderRef: ViewContainerRef;
    // reference for body.
    @ViewChild('modalBodyRef', { read: ViewContainerRef }) public modalBodyRef: ViewContainerRef;
    // reference for footer.
    @ViewChild('modalFooterRef', { read: ViewContainerRef }) public modalFooterRef: ViewContainerRef;
    // reference for modal.
    @ViewChild('modalTemplateRef') public modalTemplateRef: ElementRef;


    constructor(
        @Optional() @Inject(GLOBAL_MODAL_CONFIGURATION) private globalConfig: ModalConfiguration,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        private loggerService: LoggerService<ModalLog>,
        private modalService: ModalService,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef
    ) {
        //   this.cdr.detach();
        // initialization
        // initialize the configurations with the default values in a variable.
        // your default configurations here
        this._defaultConfiguration = new ModalConfiguration();
        this.setConfiguration();
        // when positive and negative action performed promise resolve and dismiss and autoDismiss action performed promise reject .
        this.asyncStatus = new Promise((resolve, reject) => {
            this.asyncStatusResolve = resolve;
            this.asyncStatusReject = reject;
        });
    }

    // life cycle hooks


    ngOnInit() {

    }

    ngAfterContentInit(): void {
        // this.loggerService.info(new ModalLog('modal component initialized'));
        this.initialized.emit(true);
    }


    /**
     * @description create for open modal when open method is call.
     * @returns Promise<ElementRef> resolve modal template .
     */
    public open(): Promise<ElementRef> {
        const promise: Promise<ElementRef> = new Promise<ElementRef>((resolve, reject) => {
            try {
                // modal open using render 2 addClass().
                // this.renderer.addClass(document.body, 'modal-open');
                // call for isOpen property true.
                this.setShowModal(true);
                this._status = ModalStatus.Opened;
                this.statusChange.emit(this._status);
                this.cdr.detectChanges();
                this.renderModalTemplate();

                if (this.configuration.isAutoDismissible) {
                    this.close();
                }
                resolve(this.modalTemplateRef);

            } catch (error) {
                reject(error)
            }
        });
        // this.cdk();
        return promise;
    }

    /**
     * @name close
     * @description create for close modal when user click on positive action ,negative action, dismiss button or autoDismiss.
     */
    public close(): void {
        if (!this.configuration.autoDismissTimeOut) {
            this.setShowModal(false);
            this.configuration.autoDismissTimeOut = 5000;
            if (this.configuration.isAutoDismissible) {
                this.timerInstance.unsubscribe();
            }
            return;
        }

        const subject = new BehaviorSubject<boolean>(false);
        this.modalTimer = { paused: subject, obs: this.getPauseableTimer(this.configuration.autoDismissTimeOut, subject) }
        this.timerInstance = this.modalTimer.obs.stepTimer.subscribe((totalTime) => {
            if (totalTime >= this.configuration.autoDismissTimeOut) {
                this.setShowModal(false);
                this.asyncStatusReject(ActionButtonType.AutoDismiss);
                this.autoDismiss.emit(ActionButtonType.AutoDismiss);
                this.timerInstance.unsubscribe();
            }
        })

    }

    private getPauseableTimer(timeout: number, pause: BehaviorSubject<boolean>): { stepTimer: Observable<any> } {
        let initialDelay: number;

        if (timeout > 0) {
            initialDelay = 100;
        } else {
            initialDelay = 0;
        }

        const pauseableTimer$ = defer(() => {
            let milliseconds = 0;
            return interval(initialDelay).pipe(
                withLatestFrom(pause),
                filter(([v, paused]) => !paused),
                take(timeout),
                map(() => milliseconds += 100)
            )
        }).pipe(share());

        return { stepTimer: pauseableTimer$ }
    }

    /**
     * @name onDismiss
     * @description create for dismiss button click event .
     */
    public onDismiss(): void {
        this.configuration.autoDismissTimeOut = 0;
        this.close();
        this.asyncStatusReject(ActionButtonType.Dismiss);
        this.dismiss.emit(ActionButtonType.Dismiss);
    }

    /**
     * @name onPositiveAction
     * @description create for positive action button click event.
     */
    public onPositiveAction(): void {
        this.configuration.autoDismissTimeOut = 0;
        this.close();
        this.asyncStatusResolve(ActionButtonType.Positive);
        this.positiveAction.emit(ActionButtonType.Positive);
    }

    /**
     * @name onNegativeAction
     * @description create for negative action button click event.
     */
    public onNegativeAction(): void {
        this.configuration.autoDismissTimeOut = 0;
        this.close();
        this.asyncStatusResolve(ActionButtonType.Negative);
        this.negativeAction.emit(ActionButtonType.Negative);
    }

    /**
     * @description: 
     *  -   Responsible to pause timer of Auto dismissible modal.
     *  -   Log warning when invocation is done by non isAutoDismissible modal.
     */
    public pauseTimer(): void {
        this.pauseStartTimer(true, 'set `isAutoDismissible` of `configuration` to true, to invoke pauseTimer()');
    }

    /**
     * @description: 
     *  -   Responsible to pause timer of Auto dismissible modal.
     *  -   Log warning when invocation is done by non isAutoDismissible modal.
     */
    public startTimer(): void {
        this.pauseStartTimer(false, 'set `autoDismissible` of `configuration` to true, to invoke startTimer()');
    }

    public onBackdropClick(): void {
        this.configuration.autoDismissTimeOut = 0;
        this.close();
        this.backdropClick.emit(ActionButtonType.Backdrop);
    }

    // private methods

    /**
     * Responsible to start / pause timer and log message, when invocation is done in non auto dismissible mode.
     * @param pauseStartFlag    - When true then pause the timer, otherwise start the timer.
     * @param message           - message to log when method invoked in not auto dismissible mode.
     */
    private pauseStartTimer(pauseStartFlag: boolean, message: string) {
        if (!this.configuration.isAutoDismissible) {
            this.loggerService.warning(new ModalLog(message))
            return;
        }

        this.modalTimer.paused.next(pauseStartFlag)
    }

    /**
     * @name renderModalTemplate
     * @description based on the modalTemplate using switch case set individual template for modalHeaderRef,modalBodyRef and modalFooterRef.
     */
    private renderModalTemplate(): void {
        this.modalTemplate.toArray().forEach(
            (template: GetModalDirective) => {
                switch (template.templateInput) {
                    case ModalTemplate.Header:
                        if (template.getTemplate().templateRef && this.modalHeaderRef) {
                            this.modalHeaderRef.createEmbeddedView(template.getTemplate().templateRef);
                        }
                        break;
                    case ModalTemplate.Body:
                        if (template.getTemplate().templateRef && this.modalBodyRef) {
                            this.modalBodyRef.createEmbeddedView(template.getTemplate().templateRef);
                        }
                        break;
                    case ModalTemplate.Footer:
                        if (template.getTemplate().templateRef && this.modalFooterRef) {
                            this.modalFooterRef.createEmbeddedView(template.getTemplate().templateRef);
                        }
                        break;
                }
            }
        )
    }

    // private methods
    /**
     * @description manage 'configuration' property and also check validation using utility function.
     */
    private setConfiguration(): void {
        if (this.globalConfig) {
            this.validateConfiguration(this.globalConfig, this._defaultConfiguration);
        }
        this._configuration = { ...this._defaultConfiguration, ...this.globalConfig }
    }

    /**
     * @description - Check whether configuration provided by user is valid or not.
     * - throw Error or log warning, when invalid.
     * @param userConfig  - store user configuration.
     * @param defaultConfig - store default configuration.
     */
    private validateConfiguration(userConfig: ModalConfiguration, defaultConfig: ModalConfiguration): void {
        // this utility function compare two object .
        const configValidity = ObjectUtility.compareKeys(userConfig, defaultConfig, false);

        if (!configValidity.invalid) {
            Object.keys(userConfig).forEach(key => {
                if (typeof userConfig[key] === 'object') {
                    const configValidityObj = ObjectUtility.compareKeys(userConfig[key], defaultConfig[key], false);
                    if (configValidityObj.issue.keysMismatch || configValidityObj.issue.valuesTypesMismatch) {
                        this.loggerService.fatal(new ModalLog('key / value mismatch'));
                    }

                    if (configValidityObj.issue.hasEmptyObject) {
                        this.loggerService.warning(new ModalLog('Empty configuration is passed'));
                    }
                }
            });
            return;
        }

        if (configValidity.issue.keysMismatch || configValidity.issue.valuesTypesMismatch) {
            this.loggerService.fatal(new ModalLog('key / value mismatch'));
        }

        if (configValidity.issue.hasEmptyObject) {
            this.loggerService.warning(new ModalLog('Empty configuration is passed'));
        }

    }

    /**
     * @name setShowModal
     * @description 
     */
    private setShowModal(value: boolean) {
        this.isOpen = value;
    }


    ngOnDestroy() {
        // unsubscribe all your event listeners.
    }
}

