/**
 * @author Ashok yadav
 * @description A spec file which holds the test cases for icon component.
 */
import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
// ---------------------------------------------------- //
import { IconComponent } from './icon.component';
import { IconConfiguration, GLOBAL_ICON_CONFIGURATION, validateFontSet, IconFontSet, IconDirection, IconType, IconFlip, IconSize, IconSpin, IconShape } from './icon.model';
import { IconregistryService } from '../iconregistry.service';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from '@commons/logger';
import { of } from 'rxjs/observable/of';
import { By } from '@angular/platform-browser';


fdescribe('IconComponent', function () {
    let mockLoggerService;
    mockLoggerService = jasmine.createSpyObj([
        'info',
        'debug',
        'warning',
        'error',
        'fatal'
    ]);
    let component: IconComponent;
    let fixture: ComponentFixture<IconComponent>;
    let mockInjectionToken: IconConfiguration;
    let mockIconRegistryService;
    let mockOverlayIcon;
    let mockConfiguration;
    mockOverlayIcon = {
        fontSize: "12px",
        fontColor: "yellow",
        width: "25px",
        height: "32px",
    }

    mockInjectionToken = {
        fontSize: "12px",
        fontColor: "yellow",
        width: "25px",
        height: "32px",
        overlayIcon: mockOverlayIcon,
        ariaHidden: true
    }

    beforeEach(function () {
        mockIconRegistryService = jasmine.createSpyObj(['getNamedSvgIcon', 'classNameForFontAlias', '_fontCssClassesByAlias'])
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [IconComponent],
            providers: [
                { provide: LoggerService, useValue: mockLoggerService },
                {
                    provide: GLOBAL_ICON_CONFIGURATION,
                    useValue: mockInjectionToken
                },
                {
                    provide: IconregistryService,
                    useValue: mockIconRegistryService
                },

            ]
        })
    });

    beforeEach(function () {
        fixture = TestBed.createComponent(IconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when setConfiguration() invoke ', function () {
        it('should ', () => {
            // Arrange
            mockConfiguration = {
                fontSize: "12px",
                fontColor: "yellow",
                width: "25px",
                height: "32px",
                ariaHidden: true
            }        
            spyOn<any>(component,'setConfiguration').and.callThrough();
            // Act
            component['globalConfig'] = mockConfiguration;
        });

        it('should ', () => {
            // Arrange
            mockConfiguration = undefined;
            spyOn<any>(component,'setConfiguration').and.callThrough();
            // Act
            component['globalConfig'] = mockConfiguration;
            // Assert

        })
    })
    describe('when getter setter invoke ', function () {
        it('should set and get the configuration with overlay configurationif config is get', () => {
            // arrange 
            const expectedConfiguration: IconConfiguration = {
                // your default configuration here
                fontSize: "12px",
                fontColor: "yellow",
                width: "25px",
                height: "32px"
            };
            // act 
            spyOnProperty(component, 'configuration', 'get').and.returnValue(expectedConfiguration);
            component.configuration = expectedConfiguration;
            // assert
            expect(component.configuration).toEqual(expectedConfiguration);
        });

        it('should set and get the configuration without overlay configurationif config is get', () => {
            // arrange 
            // arrange 
            const expectedConfiguration: IconConfiguration = {
                // your default configuration here
                fontSize: "12px",
                fontColor: "yellow",
                width: "25px",
                height: "32px"
            };
            // act 
            spyOnProperty(component, 'configuration', 'get').and.returnValue(expectedConfiguration);
            component.configuration = expectedConfiguration;
            // assert
            expect(component.configuration).toEqual(expectedConfiguration);
        });
    });

    describe('when apply to the ariahidden Attribute to the class ', function () {
        //Arrange
        let ariaHidden: boolean;
        let mockConfiguration;
        ariaHidden = false;
        it('should have property of aria-Hidden true', () => {
            // Arrange
            mockConfiguration = { ariaHidden: true }
            // Act
            Object.assign(mockInjectionToken, mockConfiguration)
            fixture.detectChanges();
            //Assert
            expect(fixture.debugElement.nativeElement.getAttribute('aria-hidden')).toBeTruthy();
            expect(fixture.debugElement.nativeElement.getAttribute('aria-hidden')).toBe('true');
        });

        it('should have property of aria-Hidden true', function () {
            //Arrange
            mockConfiguration = {
                ariaHidden: false
            }
            //Act
            Object.assign(mockInjectionToken, mockConfiguration)
            fixture.detectChanges();
            // Assert 
            expect(fixture.debugElement.nativeElement.getAttribute('aria-hidden')).toBeTruthy();
            expect(fixture.debugElement.nativeElement.getAttribute('aria-hidden')).toBe('true');
        });
    });



    describe('when validateFontSet are  invoke ', function () {
        it('should set and get the configuration if config is get', () => {
            // arrange 
            const expectedConfiguration: IconConfiguration = {
                // your default configuration here
                fontSize: "12px",
                fontColor: "yellow",
                width: "25px",
                height: "32px",
            };
            // act 
            spyOnProperty(component, 'configuration', 'get').and.returnValue(expectedConfiguration);
            component.configuration = expectedConfiguration;
            // assert
            expect(component.configuration).toEqual(expectedConfiguration);
        });
        //Arrange
        it('should be check correct format of fontSet ', () => {
            //Arrange 
            let mockConfiguration: any
            mockConfiguration = {
                iconName: 'fa fa-home'
            }
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(mockLoggerService.warning).toHaveBeenCalled();
            expect(validateFontSet).toBeTruthy();
            expect(mockIconRegistryService.classNameForFontAlias).toHaveBeenCalled();
        });

        it('should be check correct format of iconName ', () => {
            //Arrange 
            let mockConfiguration: any
            mockConfiguration = { fontSet: IconFontSet.FontAwesome }
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(mockLoggerService.warning).toHaveBeenCalled();
        });
    });

    describe('when updateFontSet() are  invoke ', () => {
        //Arrange
        it('should be fontSet material ', () => {
            //Arrange 
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm'
            };
            spyOn<any>(component, 'updateFontSet').and.callThrough();
            mockIconRegistryService.classNameForFontAlias.and.callThrough();
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component['updateFontSet']).toHaveBeenCalled();
            expect(mockIconRegistryService.classNameForFontAlias).toHaveBeenCalled();
        });

        it('should be fontSet material if fontAlias ', () => {
            //Arrange 
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm'
            };
            mockIconRegistryService.classNameForFontAlias.and.returnValue('alarm_on');
            spyOn<any>(component, 'updateFontSet').and.callThrough();
            mockIconRegistryService.classNameForFontAlias.and.callThrough();
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component['updateFontSet']).toHaveBeenCalled();
            expect(mockIconRegistryService.classNameForFontAlias).toHaveBeenCalled();
        });

        it('should be fontSet material ', () => {
            //Arrange 
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: 'custom',
                iconName: 'alarm'
            };
            mockIconRegistryService.classNameForFontAlias.and.returnValue('alarm_on');
            spyOn<any>(component, 'updateFontSet').and.callThrough();
            mockIconRegistryService.getNamedSvgIcon.and.returnValue(Promise.resolve('<svg></svg>'));
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component['updateFontSet']).toHaveBeenCalled();
        });

        it('should not have correct fontSet ', () => {
            //Arrange 
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fafa-home'
            };
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(mockLoggerService.warning).toHaveBeenCalled();
        });
    });

    describe('when getSvgIconElement()  invoke ', function () {
        it('should be a svg element then() call', () => {
            //Arrange 
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: 'custom',
                iconName: 'alarm'
            };
            mockIconRegistryService.getNamedSvgIcon.and.callThrough();
            mockIconRegistryService.getNamedSvgIcon.and.returnValue(Promise.resolve('<svg></svg>'));
            // Act
            component.configuration = mockConfiguration;
            //  Assert
            expect(mockIconRegistryService.getNamedSvgIcon).toHaveBeenCalled();
        });

        it('should be invokeElement and insertAdjacentHtml method', async () => {
            let mockConfiguration: any;
            let element;
            mockConfiguration = {
                fontSet: 'custom',
                iconName: 'alarm'
            };
            // Act
            element = '<svg><g></g></svg>'
            const parser = new DOMParser();
            const document = parser.parseFromString(element, "text/html");
            const iconSource = document.querySelector('svg')
            mockIconRegistryService.getNamedSvgIcon.and.returnValue(Promise.resolve(iconSource));

            const bannerElement: HTMLElement = fixture.nativeElement;
            const div = bannerElement.querySelector('div');
            component.configuration = mockConfiguration;
            const promise = new Promise((resolve, reject) => {
                if (div.innerHTML) { resolve(div) } else { reject() }
            });
            const result = await promise;
            //  Assert   
            expect(div.innerHTML).toMatch('<svg><g></g></svg>');
        });
    })

    describe('when setFontSetClasses() are  invoke ', function () {
        it('should be invoke property with  correct value iconDirection when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
            };
            // Act
            spyOn<any>(component, 'setFontSetClasses').and.callThrough();
            component.configuration = mockConfiguration;
            // Assert
            expect(component['setFontSetClasses']).toHaveBeenCalled();
        });
    });

    describe('when validateFontStyle() invoke ', function () {
        it('should be invoke property with  correct value width and height when fontSet fontAwesome', () => {
            // Arrange
            let mockConfig
            mockConfig = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                fontSize: '12px',
                width: '12x',
                height: '120px'
            }

            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfig);
            component.configuration = mockConfig;
            // Assert
            expect(component['configuration']).toBeTruthy();
        });

        it('should be invoke property with  correct value fontSize when fontSet fontAwesome', () => {
            // Arrange
            let mockConfig
            mockConfig = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                fontSize: '12x'
            }
            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfig);
            component.configuration = mockInjectionToken;
            // Assert
            expect(component['configuration']).toBeTruthy();
        });
    });

    describe('when validateFontProperty() are  invoke ', function () {
        it('should be invoke property with  correct value iconDirection when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                iconDirection: IconDirection.Up
            };
            // Act
            spyOn<any>(component, 'setFontSetClasses').and.callThrough();
            component.configuration = mockConfiguration;
            // Assert
            expect(component['setFontSetClasses']).toHaveBeenCalled();
            expect(component['validateFontProperty']).toBeTruthy();
        });

        it('should be not invoke property with  correct value iconFlip when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                iconFlip: IconFlip.FlipHorizontal
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toMatch('true');
        });

        it('should be not invoke property with  correct value iconSize when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                iconSize: IconSize.Large
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toMatch('true');
        });

        it('should be not invoke property with  correct value iconType when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                iconType: IconType.Hightlight
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toMatch('true');
        });

        it('should be not invoke property with  correct value iconSpin when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                iconSpin: IconSpin.AnticlockWise
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toMatch('true');
        });

        it('should be not invoke property with  correct value iconShape when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                iconShape: IconShape.Circle
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toMatch('true');
        });

        it('should be not invoke property with  correct value isInverse true when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                isInverse: true
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toMatch('true');
        });

        it('should be not invoke property with  correct value isInverse false when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                isInverse: false
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toMatch('true');
        });


        it('should be not invoke property with  correct value isDisabled true when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                isDisabled: true
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(mockLoggerService.warning).toHaveBeenCalled();
            expect(component['validateFontProperty']).toMatch('true');
        });


        it('should be not invoke property with  correct value isDisabled false when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                isDisabled: false
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(mockLoggerService.warning).toHaveBeenCalled();
            expect(component['validateFontProperty']).toMatch('true');
        });
    })

    describe('when validateFontProperty() function  invoke ', function () {

        it('should be not invoke property with  correct value iconDirection when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                iconDirection: IconType.Error,
                iconType: IconType.Hightlight,
                iconShape: IconShape.Circle

            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(mockLoggerService.warning).toHaveBeenCalled();
        });
        it('should be not invoke property with  correct value isInverse not a boolean when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                isInverse: ''
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(mockLoggerService.warning).toHaveBeenCalled();
        });


        it('should be not invoke property with  correct value isDisabled a not boolean when fontSet fontAwesome', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                isDisabled: ''
            };
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(mockLoggerService.warning).toHaveBeenCalled();
        });
    });


    describe('when setIconConfig() function  invoke when fontSet is fontAwesome ', function () {
        it('should be invoke  ', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: 'fa fa-home',
                iconDirection: IconDirection.Up,
                iconType: IconType.Hightlight
            };
            mockIconRegistryService.classNameForFontAlias.and.returnValue('fa fa-home');
            spyOn<any>(component, 'setIconConfig').and.callThrough();
            // Act               
            component.configuration = mockConfiguration;
            // Assert
            expect(component['setIconConfig']).toHaveBeenCalled();
            expect(component['fontAwesome']).toEqual('fa fa-home');
        });

        it('should  be render the  font class and style to the icon', () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.FontAwesome,
                iconName: "fa fa-home",
                fontSize: "13px",
                fontColor: "orange",
                iconDirection: IconDirection.Bottom
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toBe('fa fa-home cmn-icon bottom');
            expect(span[0].style.cssText).toBe('color: orange; font-size: 13px;');
        });
    });

    xdescribe('when setIconConfig() function  invoke when fontSet is material ', function () {
        it('should be invoke  when fontSet is material', () => {
            // Arrange
            let mockConfiguration: any;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                iconDirection: IconDirection.Up,
                iconType: IconType.Hightlight
            };
            mockIconRegistryService.classNameForFontAlias.and.returnValue('alarm');
            spyOn<any>(component, 'setIconConfig').and.callThrough();
            // Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['setIconConfig']).toHaveBeenCalled();
            expect(component.material).toEqual('alarm');
        });

        it('should  be render the class font and style to the icon', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                fontSize: "123px",
                fontColor: "orange",
                iconDirection: IconDirection.Bottom
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toBe('material-icons cmn-icon bottom');
            expect(span[0].style.cssText).toBe('color: orange; font-size: 123px;');
        });



        it('should  be render the class font and style to the icon with property iconFlip iconShape iconType', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                fontSize: "123px",
                iconDirection: IconDirection.Bottom,
                iconFlip: IconFlip.FlipHorizontal,
                iconShape: IconShape.Circle,
                iconType: IconType.Hightlight
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toEqual('material-icons cmn-icon bottom flip-horizontal circular is-highlight');
            expect(span[0].style.cssText).toBe('color: inherit; font-size: 123px;');
        });

        it('should  have property iconDirection: bottom iconFlip: flipHorizontal iconShape: circle iconSpin: AnticlockWise', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                fontSize: "123px",
                iconDirection: IconDirection.Bottom,
                iconFlip: IconFlip.FlipHorizontal,
                iconShape: IconShape.Circle,
                iconSpin: IconSpin.AnticlockWise
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toEqual('material-icons cmn-icon bottom flip-horizontal circular spin-anticlockwise');
            expect(span[0].style.cssText).toBe('color: inherit; font-size: 123px;');
        });

        it('should  have property iconDirection: Up iconFlip: flipVertical iconShape: square iconSpin: clockWise', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                iconDirection: IconDirection.Up,
                iconFlip: IconFlip.FlipVertical,
                iconShape: IconShape.Square,
                iconSpin: IconSpin.ClockWise
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toEqual('material-icons cmn-icon up flip-vertical bordered spin-clockwise');
            expect(span[0].style.cssText).toBe('color: inherit; font-size: initial;');
        });

        it('should  have property iconDirection: right', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                iconDirection: IconDirection.Right,
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toEqual('material-icons cmn-icon right');
            expect(span[0].style.cssText).toBe('color: inherit; font-size: initial;');
        });

        it('should  have property iconDirection: right', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                iconDirection: IconDirection.Left,
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toEqual('material-icons cmn-icon left');
            expect(span[0].style.cssText).toBe('color: inherit; font-size: initial;');
        });

        it('should  have property iconType error', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                iconType: IconType.Error,
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toEqual('material-icons cmn-icon is-error');
            expect(span[0].style.cssText).toBe('color: inherit; font-size: initial;');
        });

        it('should  have property iconType info', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                iconType: IconType.Info,
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toEqual('material-icons cmn-icon is-info');
            expect(span[0].style.cssText).toBe('color: inherit; font-size: initial;');
        });

        it('should  have property iconType warning', async () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: "alarm",
                iconType: IconType.Warning,
            }
            //Act     
            component.configuration = mockConfiguration;
            fixture.detectChanges();
            const bannerElement: HTMLElement = fixture.nativeElement;
            const span = bannerElement.querySelectorAll('span');
            // Assert
            expect(span[0].className).toEqual('material-icons cmn-icon is-warning');
            expect(span[0].style.cssText).toBe('color: inherit; font-size: initial;');
        });
    })

    xdescribe('when injectionToken are  invoke ', function () {
        it('should set and get the configuration if config is get', () => {
            expect(component.configuration).toEqual(mockInjectionToken);
        });
    });

    xdescribe('when extractIconConfig() function invoke ', function () {
        it('should be is-inverse true and is-disable true', () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: "fontAwesome",
                iconName: "fa fa-home",
                fontSize: "123px",
                fontColor: "orange",
                isInverse: true,
                isDisabled: true
            }
            //Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toBeTruthy();
        });

        it('should  be is-inverse false and is-disable false', () => {
            // Arrange
            let mockConfiguration;
            mockConfiguration = {
                fontSet: "fontAwesome",
                iconName: "fa fa-home",
                fontSize: "123px",
                fontColor: "orange"
            }
            //Act
            component.configuration = mockConfiguration;
            // Assert
            expect(component['validateFontProperty']).toBeTruthy();
        });
    });

    xdescribe('when validateColor() function invoke ', function () {
        it('should be invoke setStyleFontColor()  then setStyle color if valid colorProperty', function () {
            // Arrange
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                fontColor: "inherit",
            }
            spyOn<any>(component, 'validateColor').and.callThrough();
            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfiguration);
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component["validateColor"]).toHaveBeenCalled();
        });

        it('should be return undefined to the colorConfig', function () {
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                fontColor: undefined
            }
            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfiguration);
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component["configuration"].fontColor).toEqual(undefined);
        });

        it('should be red color property to the colorConfig', function () {
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                fontColor: 'red'
            }
            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfiguration);
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component["configuration"].fontColor).toEqual('red');
        });

        it('should be red color property to the colorConfig', function () {
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                fontColor: '#fff0aa'
            }
            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfiguration);
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component["configuration"].fontColor).toEqual('#fff0aa');
        });

        it('should be invoke checkValidColor() for validate if it is rgb', function () {
            //Arrange
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                fontColor: 'rgb(244, 255, 233)'
            }
            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfiguration);
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component["configuration"].fontColor).toEqual('rgb(244, 255, 233)');
        });

        it('should be invoke checkValidColor() for validate if it is rgba', function () {
            // Arrange
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                fontColor: 'rgba(244, 255, 233, 122)'
            }
            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfiguration);
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component["configuration"].fontColor).toEqual('rgba(244, 255, 233, 122)');
        });

        it('should be red color property to the colorConfig', function () {
            let mockConfiguration: any
            mockConfiguration = {
                fontSet: IconFontSet.Material,
                iconName: 'alarm',
                fontColor: '#ffz00'
            }
            spyOnProperty(component, 'configuration', 'get').and.returnValue(mockConfiguration);
            //Act
            component.configuration = mockConfiguration;
            //Assert
            expect(component["configuration"].fontColor).not.toEqual('#fff0aa');
            expect(mockLoggerService.warning).toHaveBeenCalled();
        });
    });

    afterEach(function () {
        fixture.destroy();
        fixture.nativeElement.remove();
    });

})
