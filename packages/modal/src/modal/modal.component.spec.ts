/**
 * @author Ronak Patel
 * @description A spec file which holds the test cases for modal component.
 */
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
// ---------------------------------------------------- //
import { ModalComponent } from './modal.component';
import { ModalConfiguration, ModalSize, GLOBAL_MODAL_CONFIGURATION, ModalTemplate, ActionButtonText, ActionButton, ModalStatus } from './modal.model';
import { GetModalDirective } from './directives/get-template.directive';
import { ValueProvider, Component, ViewChildren, QueryList, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('ModalComponent', function () {
    @Component({
        selector: 'cmn-parent-modal',
        template: `
        {{status}}
        <cmn-modal (initialized)="initialized($event)" [(status)]="status" >
            <h1 *cmnModalTemplate="modalTemplate.Header"> first modal</h1>
            <div *cmnModalTemplate="modalTemplate.Body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quo dolore.
            Quibusdam nesciunt illum officia porro. Sequi dolorem debitis ipsum voluptatibus cupiditate impedit laboriosam
            veniam porro, deserunt expedita, vitae tenetur?
            </div>
            <h6 *cmnModalTemplate="modalTemplate.Footer"><button>ok</button><button>cancel</button></h6>
            </cmn-modal>`
    })
    class MockModalWrapperComponent {
        public modalTemplate: typeof ModalTemplate;
        public init: boolean;
        public status: ModalStatus;
        @ViewChildren(GetModalDirective) templates: QueryList<GetModalDirective>;
        public configuration: ModalConfiguration;
        constructor() {
            this.modalTemplate = ModalTemplate;
            this.configuration = new ModalConfiguration();
            this.status = ModalStatus.Closed;
        }
        public initialized(value: boolean): void {
            this.init = value;
        }



    }
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let wrapperComponent: MockModalWrapperComponent;
    let fixtureWrapper: ComponentFixture<MockModalWrapperComponent>;

    let modalTemplateArray: GetModalDirective[];



    const globalConfig: ModalConfiguration = {
        size: ModalSize.Medium,
        actionButton: {
            isPositive: true,
            isNegative: true
        },
        actionButtonText: {
            positive: 'Yes',
            negative: 'No'
        },
        isDismissible: true,
        isAutoDismissible: true,
        autoDismissTimeOut: 5000,
        allowBackdrop: true
    }
    function createComponent(globalConfigProvider?: ValueProvider) {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            declarations: [
                GetModalDirective,
                ModalComponent,
                MockModalWrapperComponent
            ],
            providers: (globalConfigProvider && globalConfigProvider.hasOwnProperty('provide'))
                ? [globalConfigProvider]
                : []
        })
    }


    function executePrerequisite(expectedConfiguration?, globalConfigProvider?: ValueProvider) {
        debugger;
        createComponent(globalConfigProvider);
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixtureWrapper = TestBed.createComponent(MockModalWrapperComponent);
        wrapperComponent = fixtureWrapper.componentInstance;
        fixtureWrapper.detectChanges();
        modalTemplateArray = wrapperComponent.templates.toArray();

        if (expectedConfiguration) {
            component.configuration = expectedConfiguration;
        }
        fixture.detectChanges();
    }

    describe('On initialization', function () {
        it('should create the component', function () {
            executePrerequisite();
            expect(component).toBeTruthy();
        });

        describe('getter setter', function () {
            it('should set and get the configuration', function () {
                // arrange 
                const expectedConfiguration: ModalConfiguration = {
                    size: ModalSize.Medium,
                    actionButton: {
                        isPositive: true,
                        isNegative: true
                    },
                    actionButtonText: {
                        positive: 'Yes',
                        negative: 'No'
                    },
                    isDismissible: true,
                    isAutoDismissible: true,
                    autoDismissTimeOut: 5000,
                    allowBackdrop: true
                }
                executePrerequisite(expectedConfiguration);

                // assert
                expect(component.configuration).toEqual(expectedConfiguration);
            });

            it('should set and get the size pass by user', function () {
                // Arrange 
                const size: ModalSize = ModalSize.Small;
                executePrerequisite();
                // Act 
                spyOnProperty(component, 'size', 'get').and.returnValue(size);

                // Assert
                expect(component.size).toEqual(size);
                // expect(component.configuration.size).toEqual(size);
            });


        });

        it(`should set default configuration in 'configuration' property, when configuration is not applied globally`, () => {
            // Arrange
            const defaultConfiguration: ModalConfiguration = {
                size: ModalSize.Medium,
                actionButton: {
                    isPositive: true,
                    isNegative: true
                },
                actionButtonText: {
                    positive: 'Yes',
                    negative: 'No'
                },
                isDismissible: true,
                isAutoDismissible: true,
                autoDismissTimeOut: 5000,
                allowBackdrop: true
            }
            executePrerequisite(defaultConfiguration, null);
            // Act
            // Assert
            expect(component.configuration).toEqual(defaultConfiguration);
        });

        it(`should set global configuration in 'configuration' property, when configuration is applied globally`, () => {
            // Arrange
            const globalConfigProvider = {
                provide: GLOBAL_MODAL_CONFIGURATION,
                useValue: globalConfig
            };
            executePrerequisite(null, globalConfigProvider);
            // Act

            // Assert
            expect(component.configuration).toEqual(globalConfig);
        });
    });

    describe(`should check parent template render `, function () {
        it('should set the template for modal header', function () {
            // Arrange 
            executePrerequisite();
            // Act
            const header = modalTemplateArray.some(template => template.templateInput === ModalTemplate.Header);
            // Assert
            expect(header).toBe(true);
        });

        it('should set the template for modal body', function () {
            // Arrange 
            executePrerequisite();
            // Act
            const body = modalTemplateArray.some(template => template.templateInput === ModalTemplate.Body);
            // Assert
            expect(body).toBe(true);
        });

        it('should set the template for modal footer', function () {
            // Arrange 
            executePrerequisite();
            // Act
            const body = modalTemplateArray.some(template => template.templateInput === ModalTemplate.Body);
            // Assert
            expect(body).toBe(true);
        });
    });
    describe('modal template render', function () {
        beforeEach(() => {
            // Arrange
            executePrerequisite();
            component.open();
        });

        it('should check modalTemplateRef define', function () {
            // Assert
            expect(component.modalTemplateRef).toBeDefined();
        });

        it('should check modalTemplate define', function () {
            // Assert
            expect(component.modalTemplate).toBeDefined();
        });

        it('should check modalHeaderRef define', function () {
            // Assert
            expect(component.modalHeaderRef).toBeDefined();
        });

        it('should check modalBodyRef define', function () {
            // Assert
            expect(component.modalBodyRef).toBeDefined();
        });

        it('should check modalFooterRef define', function () {
            // Assert
            expect(component.modalFooterRef).toBeDefined();
        });


        it('should check the template for modal header', function () {

            // Act
            const modalHeader = fixture.debugElement.query(By.css('.modal-header'));
            // Assert
            expect(modalHeader).toBeTruthy();
        });

        it('should check the template for modal body', function () {

            // Act
            const modalBody = fixture.debugElement.query(By.css('.modal-body'));
            // Assert
            expect(modalBody).toBeTruthy();
        });

        it('should check the template for modal footer', function () {

            // Act
            const modalFooter = fixture.debugElement.query(By.css('.modal-footer'));
            // Assert
            expect(modalFooter).toBeTruthy();
        });

        it('should show positive button on modal footer by default', function () {

            // Act
            const modalPositiveBtn = fixture.debugElement.query(By.css('.footer-action-button button.btn-primary'));
            // Assert
            expect(modalPositiveBtn).toBeTruthy();
        });

        it('should show negative button on modal footer by default', function () {

            // Act
            const modalNegativeBtn = fixture.debugElement.query(By.css('.footer-action-button button.btn-outline'));
            // Assert
            expect(modalNegativeBtn).toBeTruthy();
        });
    });


    it('should check positive button text property pass by user ', function () {
        // Arrange
        const localConfig: ModalConfiguration = {
            actionButton: {
                isPositive: true
            },
            actionButtonText: {
                positive: 'Yes'
            }
        }
        executePrerequisite(localConfig);
        component.open();

        // Act
        const modalPositiveBtn = fixture.debugElement.query(By.css('button.btn-primary'));

        // Assert
        expect(modalPositiveBtn.nativeElement.textContent).toBe(localConfig.actionButtonText.positive);
    });

    it('should check negative button text property pass by user', function () {
        // Arrange
        const localConfig: ModalConfiguration = {
            actionButton: {
                isNegative: true
            },
            actionButtonText: {
                negative: 'no'
            }
        }
        executePrerequisite(localConfig);
        component.open();

        // Act
        const modalNegativeBtn = fixture.debugElement.query(By.css('button.btn-outline'));

        // Assert
        expect(modalNegativeBtn.nativeElement.textContent).toBe(localConfig.actionButtonText.negative);
    });



    it('should show modal close button when user set isDismissible equal true', function () {
        // Arrange
        const localConfig: ModalConfiguration = {
            isDismissible: true
        }
        executePrerequisite(localConfig);
        component.open();

        // Act
        const modalCloseBtn = fixture.debugElement.query(By.css('.modal-close-button button.close'));
        // Assert
        expect(modalCloseBtn).toBeTruthy();
    });

    it('should hide modal close button when user set isDismissible equal false', function () {
        // Arrange
        const localConfig: ModalConfiguration = {
            isDismissible: false
        }
        executePrerequisite(localConfig);
        component.open();

        // Act
        const modalCloseBtn = fixture.debugElement.query(By.css('.modal-close-button button.close'));
        // Assert
        expect(modalCloseBtn).toBeFalsy();
    });

    it('should check modal autoDismiss when user set isAutoDismissible equal to true and set autoDismiss time equal to 5000 ms', fakeAsync(() => {
        // Arrange 
        const localConfig: ModalConfiguration = {
            isAutoDismissible: true,
            autoDismissTimeOut: 5000
        }
        executePrerequisite(localConfig);
        component.open();
        // Act
        // component.open();
        // Assert
        tick(5000);
        fixture.detectChanges();
        const modal = fixture.debugElement.query(By.css('.cmn-modal'));
        expect(component.isOpen).toBe(false);
        expect(!!modal).toBeFalsy();

    }));

    it('should show modal backdrop when set true', function () {
        // Arrange 
        executePrerequisite();

        // Act
        component.open();
        const modalBackdrop = fixture.debugElement.query(By.css('.cmn-modal-backdrop'));
        // Assert 
        expect(modalBackdrop).toBeTruthy();
    });

    it('should check modal size using scss class when user set size large', function () {
        // Arrange
        const localConfig: ModalConfiguration = {
            size: ModalSize.Large
        }
        executePrerequisite(localConfig);
        
        // Act 
        component.open();
        const modalSize = fixture.debugElement.query(By.css('.modal-lg'));
        // Assert
        expect(modalSize).toBeTruthy();
    });

    it('should check modal size using scss class when user set size medium', function () {
        // Arrange
        const localConfig: ModalConfiguration = {
            size: ModalSize.Medium
        }
        executePrerequisite(localConfig);
        
        // Act 
        component.open();
        const modalSize = fixture.debugElement.query(By.css('.modal-dialog'));

        // Assert
        expect(modalSize).toBeTruthy();
    });

    it('should check modal size using scss class when user set size small', function () {
        // Arrange
        const localConfig: ModalConfiguration = {
            size: ModalSize.Small
        }
        executePrerequisite(localConfig);
        
        // Act 
        component.open();
        const modalSize = fixture.debugElement.query(By.css('.modal-sm'));

        // Assert
        expect(modalSize).toBeTruthy();
    });

    it('should check modal size using scss class when user set size xlarge', function () {
        // Arrange
        const localConfig: ModalConfiguration = {
            size: ModalSize.Xlarge
        }
        executePrerequisite(localConfig);
        
        // Act 
        component.open();
        const modalSize = fixture.debugElement.query(By.css('.modal-xl'));

        // Assert
        expect(modalSize).toBeTruthy();
    });

    it('should check callback when modal initialized', async function () {
        // Arrange
        executePrerequisite();
        // Assert
        component.open();
        expect(wrapperComponent.init).toBe(true);
    });

    it('should check two way binding attribute status ', (() => {
        // Arrange
        executePrerequisite();
        debugger;
        component.open();
        fixture.detectChanges();
        fixtureWrapper.detectChanges();
        // Act
        // component.close();
        debugger;
        console.log('fixtureWrapper.componentInstance.status', fixtureWrapper.componentInstance.status);
        

    }));

    afterEach(function () {
        fixture.destroy();
        fixture.nativeElement.remove();
    });
});
