export class CompareKeysReturnValue {
    invalid: boolean;
    keys: any;
    issue: {
        typeMismatch: boolean;
        keysMismatch: boolean;
        valuesTypesMismatch: boolean;
        hasEmptyObject: boolean;
    };
}

export enum ValidTypes {
    Boolean = 'boolean',
    Number =  'number',
    String =  'string',
    Function = 'function',
    Array =  'array',
    Date = 'date',
    RegExp = 'regExp',
    Object =  'object',
    Error = 'error',
}