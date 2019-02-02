/**
 * @author Ashok Yadav
 * @class UnitValidatorComponent
 * @description 
 */


export class UnitValidator {

/**
* validate font style Attribute like fon-size width and height which is user apply.
* @param unitItem contain all configuration which user apply.
*/
public static unitValidate(unitItem: string): boolean {
    let fontStyle: boolean;
    const fontSizePattern = new RegExp(/^([0-9]{1,15}px|[0-9]{1,15}%|[0-9]{1,15}em)/);
    fontStyle = fontSizePattern.test(unitItem.toLocaleLowerCase());
    return fontStyle;
  }
}
