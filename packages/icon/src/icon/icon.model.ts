/**
 * @author Ashok yadav
 * @description This file consists of the classes that will be used to set the configurations for the icon component
 */

import { InjectionToken } from "@angular/core";
import { SafeResourceUrl, SafeHtml } from "@angular/platform-browser";
import { IconLog } from "@commons/icon/src/icon/icon.log";




/**
 * @name IconConfiguration
 * @description Defines   property of  IconConfiguration.
 * @property 
 */

export class IconConfiguration {
  fontSet?: IconFontSet | string;
  iconName?: string;
  fontSize?: string;
  fontColor?: string;
  width?: string;
  height?: string;
  iconType?: IconType;
  overlayIcon?: OverlayIcon;
  iconSize?: IconSize;
  iconDirection?: IconDirection;
  iconFlip?: IconFlip;
  isInverse?: boolean;
  isDisabled?: boolean;
  isAlert?: boolean;
  badge?: IconBadge;
  alertSize?: AlertSize;
  iconSpin?: IconSpin;
  position?: IconPosition;
  iconShape?: IconShape;
  ariaHidden?: boolean;

  constructor(
    fontSize: string = IconFontAttribute.FontSize,
    fontColor: string = IconFontAttribute.FontColor,
    width: string = SvgIconAttribute.Width,
    height: string = SvgIconAttribute.Height
  ) {
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.width = width;
    this.height = height;
    this.isInverse = false;
    this.isDisabled = false;
    this.ariaHidden = false;
    this.isAlert = false;
   // this.overlayIcon = new OverlayIcon();
  }
}
;
/**
 * @name OverlayIcon
 * @description Defines   property of  OverlayIconConfig.
 * @property 
 */
export class OverlayIcon {
  iconName?: string
  fontSize?: string;
  fontColor?: string;
  iconSize?: IconSize;
  iconDirection?: IconDirection;
  iconFlip?: IconFlip;
  isInverse?: boolean;
  isDisabled?: boolean;
  iconSpin?: IconSpin;
  iconShape?: IconShape;
  iconType?: IconType;
  width?: string;
  ariaHidden?: boolean;
  height?: SvgIconAttribute | string;
  position?: IconPosition;
  constructor(
    fontSize: string = IconFontAttribute.FontSize,
    fontColor: string = IconFontAttribute.FontColor,
    width: string = SvgIconAttribute.Width,
    height: string = SvgIconAttribute.Height
  ) {
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.width = width;
    this.height = height;
    this.isInverse = false;
    this.isDisabled = false;
    this.ariaHidden = false;
  }
}


/**
 * @name AttributeConfig
 * @description Defines   property of  AttributeConfig.
 * @property 
 */
export class AttributeConfig {
  width: string
  height: string
  id: number
  fit: string | null
  viewBox: string
  focusable: string
  preserveAspectRatio: string
}

/**
 * @name IconFontAttribute
 * @description Defines   property of  IconFontAttribute.
 * @property fontSize and fontcolor  Provide default class to the font.
 */
export enum IconFontAttribute {
  FontSize = 'initial',
  FontColor = 'inherit'
}

/**
 * @name FontStyle
 * @description Defines   property of  FontStyle.
 * @property color, fontSize and fontWeight provide default class to the font.
 */
export class FontStyle {
  color: IconFontStyle | string;
  fontSize: IconFontStyle | string;
}

/**
 * @name IconFontStyle
 * @description Defines   property of  IconFontStyle.
 * @property size weight and color  Provide default class to the font.
 */
export enum IconFontStyle {
  Id = 'id',
  Fit = 'fit',
  Width = 'width',
  Color = 'color',
  Height = 'height',
  Size = 'font-size',
  ViewBox = "viewBox",
  Weight = 'font-weight',
  Focusable = 'focusable',
  PreserveAspectRatio = 'preserveAspectRatio',
}

/**
 * @name IconFontStyleConfig
 * @description Defines   property of  IconFontStyleConfig.
 * @property size weight and color  Provide default class to the font.
 */
export enum IconFontStyleConfig {
  Width = 'width',
  Height = 'height',
  FontSize = 'fontSize',
  FontColor = 'fontColor'
}

/**
 * @name IconSpin
 * @description Defines   property of  IconSpin.
 * @property ClockWise and AnticlockWise  Provide default class to the font.
 */
export enum IconSpin {
  ClockWise = 'spin-clockwise',
  AnticlockWise = 'spin-anticlockwise'
}

/**
 * @name IconShape
 * @description Defines   property of  IconShape.
 * @property Bordered and Circular  Provide default class to the font.
 */
export enum IconShape {
  Square = 'bordered',
  Circle = 'circular'
}

/**
 * @name IconFontSet
 * @description Defines   property of  IconFontSet.
 * @property material,fontawesome and custom which is provide fontset of the fontIcon.
 */
export enum IconFontSet {
  Material = 'material',
  FontAwesome = 'fontAwesome'
}

/**
 * @name IconConfig
 * @description Defines   property of  IconConfig.
 * @property IconFlip,IconDirection,IsInverse,IconType,IconSpin and IconSize.
 */
export enum IconConfig {
  IconFlip = 'iconFlip',
  IconType = 'iconType',
  IconSpin = 'iconSpin',
  IconSize = 'iconSize',
  IconShape = 'iconShape',
  IsInverse = 'isInverse',
  Position = 'position',
  IsDisabled = 'isDisabled',
  OverlayIcon = 'overlayIcon',
  // IsAlert = 'isAlert',
  IconDirection = 'iconDirection'
}

/**
 * @name OverlayIconConfig
 * @description Defines   property of  IconConfig.
 * @property IconFlip,IconDirection,IsInverse,IconType,IconSpin,Position,IsDisabled and IconSize.
 */
export enum OverlayIconConfig {
  IconFlip = 'iconFlip',
  IconType = 'iconType',
  IconSpin = 'iconSpin',
  IconSize = 'iconSize',
  IconShape = 'iconShape',
  IsInverse = 'isInverse',
  IsDisabled = 'isDisabled',
  Position = 'position',
  IconDirection = 'iconDirection'
}

/**
 * @name AlertIconConfig
 * @description Defines   property of  IconConfig.
 * @property CmnIcon,IconSize,IsInverse,IconType,IconSpin,Position, and IconSize.
 */
export enum AlertIconConfig {
  IconFlip = 'iconFlip',
  IconDirection = 'iconDirection',
  IsDisabled = 'isDisable',
  IsInverse = 'isInverse'
}

/**
 * @name AlertIconConfig
 * @description Defines   property of  IconConfig.
 * @property CmnIcon,IconSize,IsInverse,IconType,IconSpin,Position, and IconSize.
 */
export enum BadgeIconConfig {
  IconType = 'iconType',
  IconFlip = 'iconFlip',
  IconDirection = 'iconDirection',
  IsDisabled = 'isDisable',
  IsInverse = 'isInverse',
  Badge = 'badge'
}

/**
 * @name BadgeIcon
 * @description Defines   property of  Alert.
 * @property Alert and Badge.
 */
export enum BadgeIcon {
  IsBadgeIcon = 'isBadgeIcon',
  Badge = 'badge',
}

/**
 * @name AlertIcon
 * @description Defines   property of  Alert.
 * @property Alert and Badge.
 */
export enum AlertIcon {
  Alert = 'alert',
  IsAlert = 'isAlert'
}
/**
 * @name IconBadge
 * @description Defines   property of  IconBadge.
 * @property IconFlip,IconDirection,IsInverse,IconType,IconSpin,Position,IsDisabled and IconSize.
 */
export enum IconBadge {
  Success = 'is-success',
  Error = 'is-error',
  Info = 'is-info'
}

/**
 * @name IconClass
 * @description Defines   property of  IconConfig.
 * @property CmnIcon,CornerIcon and MaterialIcons.
 */
export enum IconClass {
  CmnIcon = 'cmn-icon',
  CornerIcon = 'corner-icon',
  MaterialIcons = 'material-icons',
}

/**
 * @name FontAwesomeClass
 * @description Defines   property of  FontAwesomeClass.
 * @property IconFlip,IconDirection,IsInverse,IconType,IconSpin and IconSize.
 */
export enum FontAwesomeClass {
  Alert = 'fa fa-warning',
  Badge = 'fa fa-circle'
}

/**
 * @name MaterialClass
 * @description Defines   property of  FontAwesomeClass.
 * @property IconFlip,IconDirection,IsInverse,IconType,IconSpin and IconSize.
 */
export enum MaterialClass {
  Alert = 'warning',
  Badge = 'circle'
}

/**
 * @name svgTag
 * @description Defines   property of  svgTag.
 * @property symbol, svg  and  Provide nodename of the Element.
 */
export enum ElementNode {
  Symbol = 'symbol',
  Svg = 'svg',
  G = 'g'
}

/**
 * @name IconType
 * @description Defines   property of  IconType.
 * @property Hightlight,Error, Warning, Info, Success which is apply to the icon.
 */
export enum IconType {
  Info = 'is-info',
  Error = 'is-error',
  Inverse = 'is-inverse',
  Success = 'is-success',
  Warning = 'is-warning',
  Hightlight = 'is-highlight',
}

/**
 * @name IconDirection
 * @description Defines   property of  IconDirection.
 * @property Up,Right, Bottom, Left, FlipHorizontal FlipVertical and  which is apply to the icon.
 */
export enum IconDirection {
  Up = 'up',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom',
}

/**
 * @name IconFlip
 * @description Defines   property of  IconFlip.
 * @property FlipHorizontal FlipVertical apply to the icon.
 */
export enum IconFlip {
  FlipVertical = 'flip-vertical',
  FlipHorizontal = 'flip-horizontal'
}

/**
 * @name IconSize
 * @description Defines   property of  IconType.
 * @property XxSmall,XSmall, Large, Info, Disable apply to the icon.
 */
export enum IconSize {
  XxSmall = 'xx-small',
  XSmall = 'x-small',
  XLarge = 'x-large',
  Large = 'large',
  Small = 'small'
}

/**
 * @name AlertSize
 * @description Defines   property of  AlertSize.
 * @property XxSmall,XSmall, Large, Info, Disable apply to the icon.
 */
export enum AlertSize {
  XxSmall = 'xx-small',
  XSmall = 'x-small',
  XLarge = 'x-large',
  Large = 'large',
  Small = 'small'
}

/**
 * @name IconPosition
 * @description Defines   property of  IconType.
 * @property TopLeft,TopRight, BottomLeft, BottomRight apply to the icon.
 */
export enum IconPosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-right',
  BottomRight = 'bottom-left'
}

/**
 * @name IconDisable
 * @description Defines   property of  IconDisable.
 * @property  Disable which is apply to the icon.
 */
export enum IconDisable {
  Disable = 'x-large disabled'
}

/**
 * @name SvgIconAttribute
 * @description Defines   property of  SvgIconWidth.
 * @property 
 */
export enum SvgIconAttribute {
  Fit = '',
  Width = "30px",
  Height = "30px",
  Focusable = 'true',
  PreserveAspectRatio = 'xMidYMid meet',
}

/**
 * @name Index
 * @description Defines   property of index.
 * @property 
 */
export enum Index {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Ten = 10
}

export enum ColorType {
  HashCode = "HashCode",
  Rgb = "Rgb",
  Rgba = "Rgba"
}
export const GLOBAL_ICON_CONFIGURATION = new InjectionToken<IconConfiguration>('iconConfiguration');

/**
 * Cleans up a value to be used as a Pass to the user.
 * @param colorInput color input  that was attempted to the function.
 * like pass a font Color .
 */
export function checkValidColor(color: string) {
  let fontColor: any;
  fontColor = isHexadecimal(color) ? true : false;
  if (color.includes('rgb')) {
    const fontValue = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    const colorValue = color.trim().split('(')[0] === 'rgb' ?
      `rgb(${fontValue[Index.One]}, ${fontValue[Index.Two]}, ${fontValue[Index.Three]})` :
      `rgba(${fontValue[Index.One]}, ${fontValue[Index.Two]}, ${fontValue[Index.Three]}, ${fontValue[Index.Four]})`;
    const colorlength = color.trim().split('(')[Index.Zero] === 'rgb' ? Index.Two : Index.One;
    for (let i = 0; i <= fontValue.length - colorlength; i++) {
      fontColor = ((fontValue[i] <= '255' && fontValue[i] >= '0') || fontValue[0] === colorValue) ? true : false;
    }
  }
  return fontColor;
}

// Check whether it is hexadecimal or not and also check the valid,
// Pattern of the color code and then return th e value true or false. 
export function isHexadecimal(colorValue: string) {
  return new RegExp(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(colorValue);
}

// Check whether fontAwesome name icon name is correct or not and return the value true or false.
export function validateFontSet(configuration: IconConfiguration, iconName: string): boolean {
  let fontPattern;
  if (!configuration.fontSet || !configuration.iconName) {
    return false;
  }
  if (configuration.fontSet === IconFontSet.FontAwesome) {
    fontPattern = new RegExp(/^fa fa-[a-z]+-*([a-z]|[0-9])+-*([a-z]|[0-9])+-*([a-z]|[0-9])*$/);
  } else {
    fontPattern = new RegExp(/^[a-z]+-*([a-z]|[0-9])+-*([a-z]|[0-9])+-*([a-z]|[0-9])*$/);
  }
  return isValidFontSet(fontPattern, iconName);
}

// export the class which is provide to function to the return the boolean value
/**
*  export the class which is provide to function to the return the boolean value.
* @param fontPattern
* @param fontAwesome
*/
export function isValidFontSet(fontPattern, fontAwesome): boolean {
  if (fontPattern.test(fontAwesome) &&
    new RegExp(/^([a-z]|[0-9])/).test(fontAwesome[fontAwesome.length - Index.One])) {
    return true;
  } else {
    return false;
  }
}
/**
* validate font style Attribute like fon-size width and height which is user apply.
* @param configuration contain all configuration which user apply.
*/
// export function validateFontStyle(configuration: string): boolean {
//   let fontStyle: boolean;
//   const fontSizePattern = new RegExp(/^([0-9]{1,15}px|[0-9]{1,15}%|[0-9]{1,15}em)/);
//   fontStyle = fontSizePattern.test(configuration.toLocaleLowerCase());
//   return fontStyle;
// }


/**
* Extract configuration value which is user apply.
* @param configuration contain all configuration which user apply.
*/
export function extractConfigValue(configuration, configValue): boolean {
  let validConfig: boolean;
  const iconProperty = new Array<string>();
  const iconValue = new Array<string>();
  if (iconPropertyConfig[configuration]) {
  // 
    iconProperty.push(iconPropertyConfig[configuration]);
    //
    Object.keys(iconProperty[Index.Zero]).forEach((config) => {
      iconValue.push(iconProperty[Index.Zero][config]);
    });
    validConfig = iconValue.includes(configValue);
  }
  return validConfig;
}

// Reference to the color from this site https://htmlcolorcodes.com/
export enum ColorProperty {
  White = "white",
  Silver = "silver",
  Grey = "grey",
  Black = "black",
  Red = "red",
  maroon = "maroon",
  Yellow = "yellow",
  Olive = "olive",
  Lime = "lime",
  Green = "green",
  Aqua = "aqua",
  Teal = "teal",
  Blue = "blue",
  Navy = "navy",
  Fuchsia = "fuchsia",
  Purple = "purple",
  Orange = "orange"
}

export const iconPropertyConfig = {
  position: IconPosition,
  iconFlip: IconFlip,
  iconSize: IconSize,
  iconShape: IconShape,
  iconSpin: IconSpin,
  iconDirection: IconDirection,
  badge: IconBadge,
  iconType: IconType
}
