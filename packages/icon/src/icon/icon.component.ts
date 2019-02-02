/**
 * @author Ashok yadav
 * @class IconComponent
 * @description The root component of icon library.
 * @example <icon [configuration]=""></icon>
 */

import {
    Component, OnInit, Input, ChangeDetectionStrategy,
    OnDestroy, ChangeDetectorRef, Inject, Optional,
    ViewEncapsulation, Attribute, ElementRef, ViewChild, SecurityContext, SimpleChanges,
    OnChanges, Renderer2, AfterViewInit, Output, EventEmitter,
    TemplateRef, ViewContainerRef, Renderer
} from '@angular/core';
// --------------------------------------------- //
// your app specific imports statements
import {
    IconConfiguration, GLOBAL_ICON_CONFIGURATION,
    IconFontSet, SvgIconAttribute, IconFontAttribute, ColorProperty,
    checkValidColor, validateFontSet, IconSize, IconDirection, IconConfig,
    IconFontStyle, IconType, FontStyle, extractConfigValue, IconFlip, IconSpin,
    IconShape, IconDisable, OverlayIcon, IconClass, OverlayIconConfig,
    IconFontStyleConfig, IconPosition, AlertIconConfig,
    IconBadge, BadgeIconConfig, FontAwesomeClass, MaterialClass, BadgeIcon, Index, iconPropertyConfig, AlertIcon
} from './icon.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { IconregistryService } from '../iconregistry.service';
import { LoggerService } from '@commons/logger';
import { IconLog } from '../../src/icon/icon.log';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { UnitValidator } from '@commons/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cmn-icon',
    templateUrl: './icon.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IconComponent implements OnInit, AfterViewInit, OnDestroy {
    _isAlert: any;
    @ViewChild('icon') public iconElementRef: ElementRef;
    @ViewChild('dataContainer') dataContainer: ElementRef;

    public isAlert: boolean;
    // set the class to the if icon is alert.
    public alertIconClass = new Array<string>();
    // set the style of the alert icon.
    public alertIconStyle: FontStyle;
    // if configuartion has badge icon.
    public isBadgeIcon: boolean;
    // set the class to the if icon is badge.
    public badgeIconClass = new Array<string>();
    // set the style of the badge icon.
    public badgeIconStyle: FontStyle;
    // set the color name and config.
    private colorProperty: string;
    // stores the configurations that were passed by the parent
    private _configuration: IconConfiguration;
    // stores the default configurations which is set a default value.
    private _defaultConfiguration: IconConfiguration;
    // Set the font-awesome name that were passed by the configuration. 
    private fontAwesome: string;
    // Set the value true or false if font-awesome font-set.
    public isFontAwesome: boolean;
    // set the class to the icon.
    public iconClass = new Array<IconConfig>();
    // set the style to the icon.
    public iconStyle: FontStyle;
    // set the value true or false if material font Set.
    public isMaterial: boolean;
    // set the value true or false if property of configuration has overlayIcon.
    public isOverlayIcon: boolean;
    // set the material icon name.
    public material: string;
    // set overlayIcon name
    public overlayIconName: string;
    // set the style of the overlay icon.
    public overlayIconStyle: FontStyle;
    // set the class to the overlay icon.
    public overlayIconClass = new Array<string>();
    // Throw error log .
    private errorLog: string;
    // set the icon name either Alias or name
    private iconName: string;
    // set the overlayIconName either Alias or name
    private ltrAndRtlDirection: string;

    /**
     * @description gets the configuration that were passed by the parent and stores it in a variable that to be used throughout this class.
     * @param config configuration object that was passed by the parent.
     */

    public get configuration(): IconConfiguration {
        return this._configuration;
    }

    /**
     * @description sets the configuration that were passed by the parent and stores 
     *   - it in a variable that to be used throughout this class.
     *   - Here set the two cofiguration object one overlay Icon object and configuration which would be pass by user. 
     * @param config configuration object that was passed by the parent.
     */

    @Input() public set configuration(config: IconConfiguration) {
        if (config) {
            this.setConfig(config);
        } else {
            this._configuration = Object.assign(this._defaultConfiguration);
        }
    }

    private setConfig(config) {
        let overlayConfig: OverlayIconConfig | IconConfiguration;
        if (config.hasOwnProperty(IconConfig.OverlayIcon)) {
            // If config has overlayIcon property then override overlayIcon object to the _defaultConfig overlayIcon object.
            overlayConfig = Object.assign(new OverlayIcon, config.overlayIcon);
            // Then assign _defaultConfiguration with config object which user can apply.
            const defaultConfiguration = Object.assign(this._defaultConfiguration, config);
            // After this override the overlay icon object of above edefaultCongiguration
            this._configuration = Object.assign(defaultConfiguration, { overlayIcon: overlayConfig });
        } else {
            this._configuration = Object.assign(this._defaultConfiguration, config);
        }
        this.validateFontSet(this._configuration);
    }


    /**
     * @description Set the isAcive property pass by the user .
     * @param activeProperty value of the setter.
     */

    public set isDisabled(active: boolean) {
        this.configuration.isDisabled = active;
        this.validateFontSet(this.configuration);
    }

    /**
    * @description Set the isAcive property pass by the user .
    * @param areaHidden value of the setter.
    */

    public set isAreaHidden(areaHidden: boolean) {
        this.configuration.ariaHidden = areaHidden;
        this.validateFontSet(this.configuration);
    }

    /**
     * @description Set the isAcive property pass by the user .
     * @param fontSet value of the setter.
     */

    public set fontSet(fontSet: string) {
        this.configuration.fontSet = fontSet;
        this.validateFontSet(this.configuration);
    }

    /**
     * @description Set the isAcive property pass by the user .
     * @param fontSet value of the setter.
     */

    public set fontColor(fontColor: string) {
        this.configuration.fontColor = fontColor;
        this.validateFontSet(this.configuration);
    }

    /**
    * @description Set the isAcive property pass by the user .
    * @param iconName value of the setter.
    */

    public set name(iconName: string) {
        this.configuration.iconName = iconName;
        this.validateFontSet(this.configuration);
    }

    /**
    * @description Set the isAcive property pass by the user .
    * @param loader value of the setter.
    */

    public set Loader(loader: IconSpin) {
        this.configuration.iconSpin = loader;
        this.validateFontSet(this.configuration);
    }

    /**
    * @description Set the isAcive property pass by the user .
    * @param circle value of the setter.
    */
    public set _circular(circle: IconShape) {
        this.configuration.iconShape = circle;
        this.validateFontSet(this.configuration);
    }

    /**
     * @description Set the isAcive property pass by the user .
     * @param rectangle value of the setter.
     */
    public set _rectangle(rectangle: IconShape) {
        this.configuration.iconShape = rectangle;
        this.validateFontSet(this.configuration);
    }

    @Output() iconEvent: EventEmitter<any> = new EventEmitter();
    // rest of your private variables
    constructor(
        private cdr: ChangeDetectorRef,
        private unitValidate: UnitValidator,
        private elementRef: ElementRef,
        private iconRegistry: IconregistryService,
        private rendererAttribute: Renderer2,
        private rendererElement: Renderer,
        private service: LoggerService<IconLog>,
        @Attribute('aria-hidden') ariaHidden: string,
        @Optional() @Inject(GLOBAL_ICON_CONFIGURATION) private globalConfig: IconConfiguration
    ) {
        this.setConfiguration();
        // If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
        // the right thing to do for the majority of icon use-cases. 
        this.ltrAndRtlDirection = 'RTL';
        this.isFontAwesome = false;
        this.isMaterial = false;
        this.isOverlayIcon = false;
        this.isAlert = false;
        this.iconName = null;
    }


    ngOnInit() {
        if (this.configuration.hasOwnProperty('ariaHidden')) {
            this.elementRef.nativeElement.setAttribute('aria-hidden', this.configuration.ariaHidden);
        }
        // this.iconEvent.emit(this.iconElementRef);
    }

    ngAfterViewInit() {
        //  this.cdr.detectChanges();
    }

    /**
    * function has configuration object which is pass by the user.
    * This function will set the configuration as global or default.
    * which is assign inside the _configuration variable.
    */
    private setConfiguration(): void {
        this._defaultConfiguration = new IconConfiguration();
        if (this.globalConfig) {
            this.setGlobalConfig();
        }
    }

    private setGlobalConfig() {
        let overlayConfig: any;        // 
        if (this.globalConfig.hasOwnProperty(IconConfig.OverlayIcon)) {
            //
            overlayConfig = Object.assign(new OverlayIcon, this.globalConfig.overlayIcon);
            //
            const defaultConfiguration = Object.assign(this._defaultConfiguration, this.globalConfig);
            //
            this._configuration = Object.assign(defaultConfiguration, { overlayIcon: overlayConfig });
        } else {
            //
            this._configuration = Object.assign(this._defaultConfiguration, this.globalConfig);
        }
        this.validateFontSet(this._configuration);
    }

    /**
    * @description Validate the iconName,if user add the wrong keyword then it does not set the fontSet.
    * @function validateFontSet seperate the value and it uses to validate.
    * @param config contain all configuration which user apply.
    */
    private validateFontSet(configuration: IconConfiguration) {
        let fontSet: boolean;
        // set the font Alias if alias is set by the user.
        const fontAlias = this.iconRegistry.classNameForFontAlias(configuration.iconName);
        this.iconName = fontAlias ? fontAlias : configuration.iconName;
        // set the alias of overlay icon if alias is set by the user.
        if (configuration.hasOwnProperty(IconConfig.OverlayIcon)) {
            const fontAliasOverlayIcon = this.iconRegistry.classNameForFontAlias(configuration.overlayIcon.iconName);
            this.overlayIconName = fontAliasOverlayIcon ? fontAliasOverlayIcon : configuration.overlayIcon.iconName;
        }
        if (!configuration.fontSet) {
            this.service.warning(new IconLog('Unable to find Could you please add the fontSet'));
        } else if (!configuration.iconName) {
            this.service.warning(new IconLog('Unable to find Could you please add the iconName'));
        } else {
            fontSet = validateFontSet(configuration, this.iconName);
            if (fontSet && configuration.overlayIcon) {
                fontSet = validateFontSet(configuration, this.overlayIconName);
            }
            this.updateFontSet(configuration, fontSet);
        }
    }

    /**
    * @description updateFontSet, execute class if fontAwesome and material then function execute.
    * @function updateFontSet execute function setFontSetClasses and getSvgIconElement.
    * @param configuration configuration contain all propety wich is user apply.
    */
    private updateFontSet(configuration: IconConfiguration, fontSet: boolean) {
        switch (fontSet) {
            case (true):
                if (configuration.fontSet === IconFontSet.FontAwesome ||
                    configuration.fontSet === IconFontSet.Material) {
                    this.setFontSetClasses(configuration);
                } else {
                    this.getSvgIconElement(configuration);
                }
                break;
            case (false):
                this.service.warning(new IconLog(
                    'Unable to find Could you please enter the correct iconName'));
                break;
        }
    }

    /**
    * Get the svg icon by the iconName which is define inside the configuration.
    * @param configuration contain all property of configuration which user apply.
    */
    private getSvgIconElement(configuration: IconConfiguration) {
        let validConfig: boolean; validConfig = true;
        validConfig = this.validateFontStyle(configuration);
        if (!validConfig) {
            this.service.error(new IconLog(`Please check the ${this.errorLog} configuration`))
            return;
        }
        this.iconRegistry.getNamedSvgIcon(configuration).then((svgElement: SVGElement) => {
            const element = svgElement.outerHTML;
            this.rendererElement.invokeElementMethod(this.dataContainer.nativeElement,
                'insertAdjacentHTML', ['beforeend', element]);
        });
    }

    /**
    * @description Execute configuration icon name if alias is available then set the icon Name as alias.
    *    - Execute configuration overlayIcon name if alias is available then set the overlay icon  Name as alias.
    *    - Execute validateFontStyle() Validate the font style `font-size` `width` and `height`.
    *    - If font style not valid then it throw error and return false to the validateFontStyle.If valid then validateFontProperty will be executed
    *    - Execute validateFontProperty which is like class property flip,type,direction,spin ...etc.
    * @param configuration contain all configuration which user apply.
    */
    private setFontSetClasses(configuration: IconConfiguration): void {
        let validConfig: boolean;
        validConfig = this.validateConfigProperty(configuration);
        if (!validConfig) {
            this.service.warning(new IconLog(`Please check the ${this.errorLog} configuration`));
            return;
        }
        switch (configuration.fontSet) {
            case (IconFontSet.FontAwesome):
                this.fontAwesome = this.iconName;
                this.isFontAwesome = this.iconName ? true : false;
                this.setPropsAndIconConfig(configuration);
                break;
            case (IconFontSet.Material):
                this.material = this.iconName;
                this.isMaterial = this.iconName ? true : false;
                this.setPropsAndIconConfig(configuration);
                break;
        }
    }

    /**
    * @description 
    *   - Execute function and set the the value is true or false of the variable isAlert, isBadge and overlayIcon.
    *   - Execute function call the setIconConfig(), Here detect changes are used for render the `Dom` element.
    *   - After set the property of the variables.
    * @param configuration Contain all configuration which apply by the user.
    */
    private setPropsAndIconConfig(configuration: IconConfiguration): void {
        if (configuration.isAlert) {
            this.isAlert = configuration.isAlert;
        }
        else if (configuration.hasOwnProperty(BadgeIcon.Badge)) {
            this.isBadgeIcon = configuration.badge ? true : false;
        }
        else {
            this.isOverlayIcon = this.overlayIconName ? true : false;
        }
        this.setIconConfig(configuration);
        this.cdr.detectChanges();
    }

    /**
    * @description Execute configuration overlayIcon name if alias is available then set the overlay icon  Name as alias.
    * @description Execute validateFontStyle() Validate the font style `font-size` `width` and `height`.
    * @param configuration contain all configuration which user apply.
    */
    private validateConfigProperty(configuration: IconConfiguration): boolean {
        let validConfig: boolean;
        // execute this finction ehich is validate the font style like font-size width and height.
        validConfig = this.validateFontStyle(configuration);
        // Whenever user apply the overlay icon object config then validate the fontstyle
        if (validConfig) {
            validConfig = this.validateOverlayFontStyle(configuration);
        }
        // If validConfig is not valid then validate  font property should not execute.
        if (validConfig) {
            validConfig = this.validateFontProperty(configuration);
        }
        if (configuration.hasOwnProperty(IconConfig.OverlayIcon)) {
            if (validConfig) {
                validConfig = this.validateFontProperty(configuration.overlayIcon);
            }
        }
        return validConfig;
    }
    /**
   * @description Execute function which is find if configuration have overlayIcon property.
   * @description Then validate fontStyle font-size width and height return true or false value
   * @param configuration contain all configuration which user apply.
   */
    private validateOverlayFontStyle(configuration: IconConfiguration): boolean {
        let validConfig: boolean; validConfig = true;
        Object.keys(configuration).forEach((config) => {
            if (config === IconConfig.OverlayIcon) {
                validConfig = this.validateFontStyle(configuration.overlayIcon);
            }
        });
        return validConfig;
    }

    /**
    * @description Set the different type of icon class to the iconSet which is apply by the user and then validate color.
    *   - Execute function which is set by the font set like font set is fontAwesome and material.
    *   - If font set is font-awesome or material which is set the font-awesome or materila class name to the icon,
    *   - which is user apply same as configuration.
    *   - If property of configuration is overlayIcon then which is set the overlay icon config for font-awesome and material.
    * @function extractIconConfig  
    * @function setOverlayIconClass
    * @function validateColor Exucute the valdateColor fiunction which is validate the color of font-awesome icon which is apply by the user.
    * @param configuration contain all the configuration.
    */
    public setIconConfig(configuration: IconConfiguration): void {
        let iconClass = new Array<any>();
        const fontAwesome: string = this.fontAwesome;
        const overlayIcon: string = this.overlayIconName;
        switch (configuration.fontSet) {
            case (IconFontSet.FontAwesome):
                const fontAwesomeClassConfig = {
                    alertClassName: FontAwesomeClass.Alert,
                    badgeClassName: FontAwesomeClass.Badge,
                    overlayConfig: overlayIcon
                }
                iconClass = [fontAwesome, IconClass.CmnIcon];
                this.setIconStyleConfig(configuration, iconClass, fontAwesomeClassConfig);
                break;
            case (IconFontSet.Material):
                const materialClassConfig = {
                    alertClassName: MaterialClass.Alert,
                    badgeClassName: MaterialClass.Badge,
                    overlayConfig: overlayIcon
                }
                iconClass = [IconClass.MaterialIcons, IconClass.CmnIcon];
                this.setIconStyleConfig(configuration, iconClass, materialClassConfig);
                break;
        }
    }

    /** 
     * @description Execute function which is set the overlay class of the icon.
     * @param configuration contain all configuration which is user apply
     */
    private setIconStyleConfig(configuration: IconConfiguration, iconClass: IconConfig[], classConfig): void {

        this.iconClass = this.extractIconConfig(configuration, iconClass, IconConfig);
        this.validateColor(configuration);
        this.setFontColorAndFontSize(configuration);

        if (this.isAlert) {
            const iconPosition = this.ltrAndRtlDirection === 'LTR' ? IconPosition.TopLeft : IconPosition.TopRight;
            iconClass = [classConfig.alertClassName, IconClass.CmnIcon, IconClass.CornerIcon, iconPosition, IconType.Warning];
            this.alertIconClass = this.setIconClass(configuration, iconClass, AlertIconConfig);

        } else if (this.isBadgeIcon) {
            const iconPosition = this.ltrAndRtlDirection === 'LTR' ? IconPosition.TopLeft : IconPosition.TopRight;
            iconClass = [classConfig.badgeClassName, IconClass.CmnIcon, IconClass.CornerIcon, iconPosition];
            this.badgeIconClass = this.setIconClass(configuration, iconClass, BadgeIconConfig);

        } else if (this.isOverlayIcon) {
            iconClass = [classConfig.overlayConfig, IconClass.CmnIcon, IconClass.CornerIcon];
            this.overlayIconClass = this.setIconClass(configuration.overlayIcon, iconClass, OverlayIconConfig);
        };
    }

    /** 
     * @description Execute function which is set the overlay , alert and badge class of the icon.
     * @param iconClass which is contain class which use to apply for the overlay, alert, and badge icon
     * @param iconConfig It has a configuration of overlay alert and badge icon use to extract configuration of the icon class.
     * @param configuration contain all configuration which is user apply
     */
    private setIconClass(configuration: IconConfiguration, iconClass: IconConfig[], iconConfig): string[] {
        let classConfig: string[];
        classConfig = this.extractIconConfig(configuration, iconClass, iconConfig);
        this.validateColor(configuration);
        return classConfig;
    }

    /**
    * @description extract iconConfig,Here find  the icon config which user apply.
    * @description And return that class which is available inside the IconConfig OverlayiconConfig enum.
    * @param configuration config which contain all configuration which is user aply.
    * @param iconClass iconClass of the fontset. 
    * @param typeConfig which is IconConfig or OverlayIconConfig type which is use to validate to assign class to correct 
    * iconClass of the fontset. 
    */
    private extractIconConfig(configuration: IconConfiguration | OverlayIcon, iconClass: IconConfig[], typeConfig): IconConfig[] {
        const iconValue = new Array<IconConfig | OverlayIconConfig | AlertIconConfig>();
        let iconConfig = new Array<IconConfig>();
        iconConfig = iconClass;
        // find the iconConfig and store inside iconValue variable. 
        Object.keys(typeConfig).forEach((config: IconConfig | OverlayIconConfig) => {
            iconValue.push(typeConfig[config]);
        });
        // find the available iconConfig and store inside the iconConfig Array.
        Object.keys(configuration).forEach((item: IconConfig | OverlayIconConfig | AlertIconConfig) => {
            if (iconValue.includes(item)) {
                const config = { config: configuration, item: item, typeConfig: typeConfig, iconConfig: iconConfig }
                this.isInverseAndDisableConfig(config);
            }
        });
        return iconConfig;
    }

    /**
     * @description Execute function set the class if configuration has is -invesre and is-disabled.
     * @param configuration config which contain all configuration item typeConfig like Icon config ,overlay icon config .
     */
    private isInverseAndDisableConfig(configuration): void {
        // configuration has property is-inverse then execute and push the class to the iconConfig array.
        if (configuration.item === IconConfig.IsInverse && configuration.config[configuration.item]) {
            configuration.iconConfig.push(IconType.Inverse);
            // configuration has property is-Disabled then execute and push the class to the iconConfig array.
        } else if (configuration.item === IconConfig.IsDisabled && configuration.config[configuration.item]) {
            configuration.iconConfig.push(IconDisable.Disable);
        } else if (this.isAlert) {
            this.isAlertConfig(configuration);
        } else if (this.isBadgeIcon) {
            this.isBadgeConfig(configuration);
        } else {
            this.isOverlayConfig(configuration);
        }
    }

    /**
     * @description Execute function set the class if configuration has isAlert.
     *  - If it is not a overlayIco n property and is Alert property then execute and push the value of the class.
     * @param configuration config which contain all configuration item typeConfig like Icon config ,overlay icon config .
     */
    private isAlertConfig(configuration): void {
        if (configuration.item !== IconConfig.OverlayIcon
            && configuration.item !== BadgeIconConfig.Badge
            && configuration.item !== AlertIcon.IsAlert) {
            configuration.iconConfig.push(configuration.config[configuration.item]);
        }
    }

    /**
     * @description Execute function set the class if configuration has badge and overlayIcon.
     *  - If it is not a overlayIco n property and is Alert property then execute and push the value of the class.
     * @param configuration config which contain all configuration item typeConfig like Icon config ,overlay icon config .
     */
    private isBadgeConfig(configuration) {
        if (configuration.config[configuration.item]
            && configuration.item !== AlertIcon.IsAlert
            && configuration.item !== IconConfig.OverlayIcon) {
            configuration.iconConfig.push(configuration.config[configuration.item]);
        }
    }

    /**
     * @description Execute function set the class if configuration has overlayIcon.
     * @param configuration config which contain all configuration item typeConfig like Icon config ,overlay icon config .
     */

    private isOverlayConfig(configuration): void {
        if (configuration.item !== configuration.typeConfig.OverlayIcon && configuration.config[configuration.item]) {
            if (configuration.item === OverlayIconConfig.Position) {
                configuration.iconConfig.push(IconClass.CornerIcon, configuration.config[configuration.item]);
            }
            else {
                configuration.iconConfig.push(configuration.config[configuration.item]);
            }
        }
    }

    /**
     * @description Execute this function which is validate configuration which property is user apply.
     * @description Check user apply property of configuration is correct or not. 
     * @param configuration contain all configuration which user apply.
     */
    private validateFontProperty(configuration: IconConfiguration): boolean {
        let validConfig: boolean; validConfig = true;
        const iconValue = new Array<IconConfig | OverlayIconConfig | AlertIconConfig | BadgeIconConfig>();
        // find the iconConfig and store inside iconValue variable. 
        Object.keys(IconConfig).forEach((config: IconConfig | OverlayIconConfig) => {
            iconValue.push(IconConfig[config]);
        });
        Object.keys(configuration).forEach((config: IconConfig | BadgeIconConfig) => {
            if (!validConfig) {
                return
            }
            const configValue = configuration[config];
            if (config === BadgeIconConfig.Badge ||
                (iconValue.includes(config) && config !== IconConfig.OverlayIcon)) {
                if (config === IconConfig.IsInverse) {
                    this.errorLog = IconConfig.IsInverse;
                    const isInverse = configuration[IconConfig.IsInverse];
                    validConfig = (isInverse === true || isInverse === false) ? true : false;
                } else if (config === IconConfig.IsDisabled) {
                    this.errorLog = IconConfig.IsDisabled;
                    const isDisable = configuration[IconConfig.IsDisabled];
                    validConfig = (isDisable === true || isDisable === false) ? true : false; 1111111
                } else {
                    this.errorLog = config;
                    validConfig = extractConfigValue(config, configValue);
                }
            }
        });

        return validConfig;
    }

    /**
     * @description validate font style value check it is valid or not which is user apply.
     * @description Property of font style is  font-size width and height.
     * @param config contain all the configuration.
   */
    private validateFontStyle(configuration: IconConfiguration): boolean {
        let validConfig: boolean; validConfig = true;
        Object.keys(configuration).forEach((config) => {
            if (!validConfig) { return validConfig; }
            const configValue = configuration[config];
            switch (config) {
                case (IconFontStyleConfig.FontSize):
                    this.errorLog = IconFontStyleConfig.FontSize;
                    validConfig = this.validateStyle(configuration, configValue);
                    break;
                case (IconFontStyle.Width):
                    this.errorLog = IconFontStyleConfig.Width;
                    validConfig = this.validateStyle(configuration, configValue);
                    break;
                case (IconFontStyle.Height):
                    this.errorLog = IconFontStyleConfig.Height;
                    validConfig = this.validateStyle(configuration, configValue);
                    break;
            }
        });
        return validConfig;
    }

    /**
    * @description validate font size width and height value check it is valid or not which is user apply.
    * @description font style font-size width and height.
    * @param configuration contain all the configuration.
    * @param configValue execute key value of fontSize width and height.
    */
    private validateStyle(configuration: IconConfiguration, configValue: string): boolean {
        let validConfig: boolean;
        if (configValue === IconFontAttribute.FontSize) {
            validConfig = true;
        } else {
            validConfig = UnitValidator.unitValidate(configValue);
        }
        return validConfig;
    }

    /**
    * @description Execute function which is find the colorProperty is available or not in configuration.
    *   - Execute setColorConfig()  if colorProprty are available in configuration.
    *   - seperate the value and it uses to validate.
    * @param configuration contain fontColor inside the configuration.
    */
    private validateColor(configuration: IconConfiguration): void {
        const colorProperty = new Array<string>();
        const colorConfig = configuration.hasOwnProperty(
            IconFontStyleConfig.FontColor) ? configuration.fontColor : undefined;
        this.colorProperty = colorConfig ? colorConfig.toLocaleLowerCase() : undefined;
        if (this.colorProperty === IconFontAttribute.FontColor) {
            this.setColorConfig(configuration, colorProperty);
        } else if (this.colorProperty) {
            this.setColorConfig(configuration, colorProperty)
        }
    }

    /**
    * @description Validate the colorInput,if user input wrong value of the color then it does not set the font color.
    * @function isColorConfig seperate the value and it uses to validate.
    * @param colorProperty Parameter have colorProperty which is pass by configuration.
    */
    private setColorConfig(configuration: IconConfiguration, colorProperty: string[]): void {
        Object.keys(ColorProperty).forEach((propertyValue: ColorProperty) => {
            colorProperty.push(ColorProperty[propertyValue]);
        });
        if (colorProperty.includes(this.colorProperty)) {
            this.setFontStyle(configuration);
        } else {
            const fontColor = checkValidColor(this.colorProperty);
            if (!fontColor) {
                this.service.warning(new IconLog('Add the valid color of the icon'));
            }
            this.setFontStyle(configuration)
        }
    }

    /**
     * @description Execute and set the icon style if user apply configuration like size and color.
     * @description If iconSize available then only color property apply to the icon.
     * @function setFontStyle seperate the value and it uses to validate.
     * @param config contain fontColor fontSize inside the configuration.
     */
    private setFontStyle(configuration: IconConfiguration) {
        const iconFontStyle: FontStyle = new FontStyle();
        // check if iconSize apply by the user then execute only color.
        if (this.isAlert) {
            this.setAlertFontSize(configuration);
        } else if (this.isBadgeIcon) {
            this.setBadgeFontSize(configuration);
        } else if (this.isOverlayIcon) {
            this.setOverlayFontStyle(configuration);
        }
    }

    /**
     * @description Execute and set the icon style if user apply configuration like size and color.
     * @description Set the overlayIcon font size and font color if configuration has overlayIcon object.
     * @description Set the only font size if configuration  has a iconType like success,highlight,warning and info
     * @function setIconColorAndIconSize seperate the value and it uses to validate if configuration has a iconType then set the fontSize.
     *   - If not then set both color and font size. if configuration has a is Alert property then execute the setAlertColorAndFontSize().
     * @param configuration contain fontColor fontSize inside the configuration.
     */
    private setFontColorAndFontSize(configuration: IconConfiguration): void {
        const iconFontStyle: FontStyle = new FontStyle();
        if (configuration.hasOwnProperty(IconConfig.IconSize)) {
            if (!configuration.hasOwnProperty(IconConfig.IconType)) {
                iconFontStyle[IconFontStyle.Color] = configuration.fontColor;
            }
        } else {
            iconFontStyle[IconFontStyle.Color] = configuration.fontColor;
            iconFontStyle[IconFontStyle.Size] = configuration.fontSize;
        }
        this.iconStyle = iconFontStyle;
    }

    /** 
     * @description Execute and set the icon style if user apply configuration like size and color. 
     * @description Execute and set he font size and color of the icon.
     * @function setAlertColorAndFontSize seperate the value and it uses to validate if configuration has a isAlert property.
     *   - And its value is true then set only font size otherwise its execute the setOverlayIconColorAndFontSize() function.
     * @param configuration contain fontColor fontSize inside the configuration.
     */
    private setAlertFontSize(configuration: IconConfiguration): void {
        const alertIconFontStyle: FontStyle = new FontStyle();
        // set size style only whenever overlay style config apply. 
        const fontSize = parseInt(configuration.fontSize, Index.Ten);
        const fontValue = (fontSize / Index.Three);
        const pixel = configuration.fontSize.split(fontSize.toString())[Index.One];
        alertIconFontStyle[IconFontStyle.Size] = `${fontValue}${pixel}`
        this.alertIconStyle = alertIconFontStyle;
    }

    /** 
     * @description Execute and set the icon style if user apply configuration like size and color. 
     * @description Execute and set he font size and color of the icon.
     * @function setBadgeFontSize seperate the value and it uses to validate if configuration has a isAlert property.
     *   - And its value is true then set only font size otherwise its execute the setOverlayIconColorAndFontSize() function.
     * @param configuration contain fontColor fontSize inside the configuration.
     */
    private setBadgeFontSize(configuration: IconConfiguration): void {
        const badgeIconFontStyle: FontStyle = new FontStyle();
        // set size style only whenever overlay style config apply.
        const fontSize = parseInt(configuration.fontSize, Index.Ten);
        const fontValue = (fontSize / Index.Three);
        const pixel = configuration.fontSize.split(fontSize.toString())[Index.One];
        badgeIconFontStyle[IconFontStyle.Size] = `${fontValue}${pixel}`;
        this.badgeIconStyle = badgeIconFontStyle;
    }

    /**
    * @description Execute and set the icon style if user apply configuration like size and color.
    * @description Set the font Size to the icon if configuration has iconType like success,error and highlight.     
    * @description Set the overlayIcon font size and font color if configuration has overlayIcon object.
    * @description Set the only font size if overlayIcon object has a iconType like success,highlight,warning and info
    * @function setOverlayIconColorAndFontSize seperate the value and it uses to validate if configuration has a iconType then set the fontSize.
    *   - If not then set both color and font size.
    * @param configuration contain fontColor fontSize inside the configuration.
    */
    private setOverlayFontStyle(configuration: IconConfiguration): void {
        const overlayIconFontStyle: FontStyle = new FontStyle();
        if (configuration.hasOwnProperty(OverlayIconConfig.IconType) &&
            !configuration.hasOwnProperty(OverlayIconConfig.IconSize)) {
            // set size style only whenever overlay style config apply. 
            overlayIconFontStyle[IconFontStyle.Size] = configuration.fontSize
        } else if (configuration.hasOwnProperty(IconConfig.IconSize)) {
            // set the color style whenever overlay style config apply.
            overlayIconFontStyle[IconFontStyle.Color] = configuration.fontColor;
        } else {
            // set the color style whenever overlay style config apply.
            overlayIconFontStyle[IconFontStyle.Color] = configuration.fontColor;
            // set the size style whenever overlay style config apply.
            overlayIconFontStyle[IconFontStyle.Size] = configuration.fontSize;
        }
        this.overlayIconStyle = overlayIconFontStyle;
    }
    ngOnDestroy() {
        // unsubscribe all your event listeners.
    }

    // public getTemplate(): TemplateRef<string> {
    //     return this.elementRef.nativeElement.firstElementChild;
    // }
}