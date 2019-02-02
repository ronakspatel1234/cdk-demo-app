import { CompareKeysReturnValue, ValidTypes } from "./object-utility.model";
import { StringUtility } from "../string-utility/string.utility";

export class ObjectUtility {
    /**
     * 
     * When obj1 and obj2 holds value of type object, Compare objects and check validity in terms of keys and values held by both object.
     * @param obj1                              Holds value to compare.
     * @param obj2                              Holds value from compare.
     * @param irrespectiveFromToObjComparison   When false, then consider obj1 as "value to compare" and obj2 as "value from comprare"
     * @param keysWithMultipleType 
     */
    public static compareKeys(obj1, obj2, irrespectiveFromToObjComparison, keysWithMultipleType?: any): CompareKeysReturnValue {
        const config: CompareKeysReturnValue = new ObjectUtility().initConfig();

        // Execute statement, when argument's type is not object.
        if (!ObjectUtility.isObject(obj1) || !ObjectUtility.isObject(obj2)) {
            config.invalid = true;
            config.issue.typeMismatch = true;
            return config;
        }

        // Execute statement, when one argument holds blank object.
        if ((Object.keys(obj1).length || Object.keys(obj2).length) && !(Object.keys(obj1).length && Object.keys(obj2).length)) {
            config.invalid = true;
            config.issue.hasEmptyObject = true;
            return config;
        }

        if (irrespectiveFromToObjComparison && (Object.keys(obj1).length < Object.keys(obj2).length)) {
            const temp = obj1;
            obj1 = obj2;
            obj2 = temp;
        }

        return this.compareValidObjects(obj1, obj2, keysWithMultipleType, config);
    }

    /**
     * Assign value to object for truthy condition.
     * @param condition Holds conditions.
     * @param obj       Holds object
     * @param keys      Holds keys to be assigned.
     * @param values    Holds value for respective keys.
     */
    public static assignValuesIfTrue(condition, obj, keys, values) {
        if(!condition) {
            return;
        }

        for(let index = 0; index < keys.length; index++) {
            obj[keys[index]] = values[index]
        }
    }

    /**
     * Check whether 'value1' and 'value2' has same type data.
     * When 'supportedType' is provided, then check whether values type is matched with one of supported type or not.
     * @param value1                Holds 1st argument.
     * @param value2                Holds 2nd argument
     * @param supportedTypes  optional and Holds value of supported type.
     */
    public static hasSameTypeData(value1, value2, supportedTypes = []): boolean {
        if (!supportedTypes.length) {
            return (this.getType(value1) === this.getType(value2));
        }

        let isValid = false;
        for(let index = 0; index < supportedTypes.length; index++) {
            const keyType = supportedTypes[index];
            if((this.getType(value1).toLowerCase() === keyType.toLowerCase()) || (this.getType(value2).toLowerCase() === keyType.toLowerCase())) {
                isValid = true;
                break;
            }
        }

        return isValid;
    }

    /**
     * Check whether argument is of type 'object' or not.
     * @param arg Holds value provided as argument.
     */
    public static isObject(arg): boolean {
        return arg ? (typeof arg === 'object' && arg.length === undefined) : !!arg;
    }

    /**
     * Provide valid primitive type for argument.
     * @param arg Holds value of any valid primitive type.
     */
    public static getType(arg): ValidTypes {
        const objToString = ({}).toString ,
        typeMap = {},
        types = [ 
            StringUtility.convertToPascalCase(ValidTypes.Boolean), 
            StringUtility.convertToPascalCase(ValidTypes.Number), 
            StringUtility.convertToPascalCase(ValidTypes.String),  
            StringUtility.convertToPascalCase(ValidTypes.Function), 
            StringUtility.convertToPascalCase(ValidTypes.Array), 
            StringUtility.convertToPascalCase(ValidTypes.Date),
            StringUtility.convertToPascalCase(ValidTypes.RegExp), 
            StringUtility.convertToPascalCase(ValidTypes.Object), 
            StringUtility.convertToPascalCase(ValidTypes.Error)
        ];

        for ( let i = 0; i < types.length ; i++ ){
            typeMap[ `[${ValidTypes.Object} ${types[i]}]` ] = types[i].toLowerCase();
        };    

        return function( value ) {
            if ( value == null ) {
                return String( value );
            }

            return (typeof value === ValidTypes.Object || typeof value === ValidTypes.Function) ?
                (typeMap[ objToString.call(value) ] || ValidTypes.Object) :
                typeof value;
        }(arg)
    }

    /**
     * @description:
     *  - Validating both objects holds same keys with 'valid type' value.
     *  - Manage 'valuesTypesMismatch', 'keysMismatch' property of config's 'issue' property.
     *  - Manage 'invalid' property of 'config'.
     * @param obj1                  Holds object to compare.
     * @param obj2                  Holds object from compare.
     * @param keysWithMultipleType  Optional and Holds supported types for keys.
     * @param config                Holds default config object of type CompareKeysReturnValue
     */
    private static compareValidObjects(obj1, obj2, keysWithMultipleType = {}, config): CompareKeysReturnValue {
        Object.keys(obj1).forEach((key) => {
            if(obj2.hasOwnProperty(key)) {
                const isValid = config.keys[key] = this.hasSameTypeData(obj1[key], obj2[key], keysWithMultipleType[key]);
                if(!isValid) {
                    config.issue.valuesTypesMismatch = true;
                    config.invalid = true;
                }
                return;
            }

            config.keys[key] = false;
            this.assignValuesIfTrue(!config.invalid, config, ['invalid'], [true]);
            this.assignValuesIfTrue(!config.issue.keysMismatch, config.issue, ['keysMismatch'], [true]);
        });

        return config;
    }

    private initConfig() {
        return {
            invalid: false,
            keys: {},
            issue: {
                typeMismatch: false,
                keysMismatch: false,
                valuesTypesMismatch: false,
                hasEmptyObject: false
            }
        }
    }
}