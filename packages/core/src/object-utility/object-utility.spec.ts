import { ObjectUtility } from './object-utility';
import { CompareKeysReturnValue, ValidTypes } from './object-utility.model';


describe('ObjectUtility', () => {
    const utility = ObjectUtility;
    
    beforeEach(() => {
        
    });
    
    describe('on initialization', () => {
        it('should have compareKeys()', () => {
            expect(utility.compareKeys).toBeDefined();
        });
    });
    
    describe('on method invokation', () => {
        let compareKeysDefaultReturnValue: CompareKeysReturnValue

        describe('compareKeys(obj1, obj2, keysWithMultipleType?: any)', () => {
            beforeEach(() => {
                compareKeysDefaultReturnValue = {
                    invalid: false,
                    keys: {},
                    issue: {
                        typeMismatch: false,
                        keysMismatch: false,
                        valuesTypesMismatch: false,
                        hasEmptyObject: false
                    }
                };
            });

            it(`should update return value's 'invalid' and 'typeMismatch' of issue property to true, when type is not same`, () => {
                // Arrange
                const arg1 = {a: 1, b: 2};
                const arg2 = 'abcd';
                const irrespectiveFromToObjComparison = false;
                // Act
                const result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                // Assert
                expect(result.invalid).toBe(true);
                expect(result.issue.typeMismatch).toBe(true);
                expect(Object.keys(result.keys).length).toEqual(0);
            })

            it(`should update return value's 'invalid' and 'hasEmptyObject' of issue property to true, when one argument is blank object`, () => {
                // Arrange
                const arg1 = {a: 1, b: 2};
                const arg2 = {};
                const irrespectiveFromToObjComparison = false;
                // Act
                const result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                const result2 = utility.compareKeys(arg2, arg1, irrespectiveFromToObjComparison);
                // Assert
                for(let arResult = [result, result2], index = 0; arResult.length < 2; index++) {
                    expect(arResult[index].invalid).toBe(true);
                    expect(arResult[index].issue.hasEmptyObject).toBe(true);
                    expect(Object.keys(arResult[index].keys).length).toEqual(0);
                }
            })

            describe('when object key names are not same', () => {
                let arg1, arg2, irrespectiveFromToObjComparison;
                beforeEach(() => {
                    // Arrange
                    arg1 = {key1: 1, key2: 2};
                    arg2 = {key1: 1, key3: 2, key4: 3};
                    irrespectiveFromToObjComparison = false;
                });
                
                it(`should update return value's 'invalid' to true`, () => {
                    // Act
                    const result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                    // Assert
                    expect(result.invalid).toBe(true);
                });

                it(`should update return value's 'issue' property by updating its 'keysMismatch' to true`, () => {
                    // Act
                    const result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                    // Assert
                    expect(result.issue.keysMismatch).toBe(true);
                })

                describe(`when 'irrespectiveFromToObjComparison' is false`, () => {
                    let result;
                    beforeEach(() => {
                        // Arrange
                        irrespectiveFromToObjComparison = false;
                        // Act
                        result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                    });
                    
                    it(`should update 'keys' property of return value, by assigning invalid and valid keys of 1st object to true and false`, () => {
                        // Assert
                        expect(Object.keys(result.keys).length).toBe(Object.keys(arg1).length);
                        expect(result.keys.key1).toBe(true);
                        expect(result.keys.key2).toBe(false);
                    });
                });
                
                describe(`when 'irrespectiveFromToObjComparison' is true`, () => {
                    let result;
                    beforeEach(() => {
                        // Arrange
                        irrespectiveFromToObjComparison = true;
                        // Act
                        result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                    });
                    
                    it(`should update 'keys' property of return value, by assigning invalid and valid keys of 2nd object to true and false`, () => {
                        // Assert
                        expect(Object.keys(result.keys).length).toBe(Object.keys(arg2).length);
                        expect(result.keys.key1).toBe(true);
                        expect(result.keys.key3).toBe(false);
                        expect(result.keys.key4).toBe(false);
                    });

                });
            });

            describe(`when value's type for objects keys are not same`, () => {
                let arg1, arg2, irrespectiveFromToObjComparison, keysWithMultipleType;
                beforeEach(() => {
                    // Arrange
                    arg1 = { key1: 1, key2: false };
                    arg2 = { key1: 1, key2: 2 };
                    irrespectiveFromToObjComparison = false;
                    keysWithMultipleType = {key2: ['number', 'boolean']};
                });
                
                it(`should update return value's 'invalid' to true`, () => {
                    // Act
                    const result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                    // Assert
                    expect(result.invalid).toBe(true);
                });

                it(`should check obj1 and obj2 values has same type or not. when invalid "Update return value's 'issue' property by updating its 'valuesTypesMismatch' to true"`, () => {
                    // Act
                    const result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                    // Assert
                    expect(result.issue.valuesTypesMismatch).toBe(true);
                })

                it(`should check obj1 and obj2 has valid type or not when 'keysWithMultipleType' is provided as 4th argument`, () => {
                    // Act
                    const result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison, keysWithMultipleType);
                    // Assert
                    expect(result.issue.valuesTypesMismatch).toBe(false);
                })

                describe(`when 'irrespectiveFromToObjComparison' is false`, () => {
                    let result;
                    beforeEach(() => {
                        // Arrange
                        irrespectiveFromToObjComparison = false;
                        // Act
                        result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                    });
                    
                    it(`should update 'keys' property of return value, by assigning invalid and valid keys of 1st object to true and false`, () => {
                        // Assert
                        expect(Object.keys(result.keys).length).toBe(Object.keys(arg1).length);
                        expect(result.keys.key1).toBe(true);
                        expect(result.keys.key2).toBe(false);
                    });
                });
                
                describe(`when 'irrespectiveFromToObjComparison' is true`, () => {
                    let result;
                    beforeEach(() => {
                        // Arrange
                        irrespectiveFromToObjComparison = true;
                        // Act
                        result = utility.compareKeys(arg1, arg2, irrespectiveFromToObjComparison);
                    });
                    
                    it(`should update 'keys' property of return value, by assigning invalid and valid keys of 2nd object to true and false`, () => {
                        // Assert
                        expect(Object.keys(result.keys).length).toBe(Object.keys(arg2).length);
                        expect(result.keys.key1).toBe(true);
                        expect(result.keys.key2).toBe(false);
                    });
                });
            })

        });

        describe('hasSameTypeData(value1, value2, supportedTypes = [])', () => {
            it('should check, whether arguments holds same type of data', () => {
                // Assert
                expect(utility.hasSameTypeData({a: 1}, {b: 1})).toBe(true);
                expect(utility.hasSameTypeData([{a: 1}], [{b: 1}])).toBe(true);
                expect(utility.hasSameTypeData(false, true)).toBe(true);
                expect(utility.hasSameTypeData(1234, 4321)).toBe(true);
                expect(utility.hasSameTypeData('str1', 'str2')).toBe(true);
                expect(utility.hasSameTypeData('str1', 2)).toBe(false);
            });

            it(`should check, whether arguments holds valid type of data, when 'supportedTypes' is passed as argument`, () => {
                // Arrange
                const supportedTypes = ['number', 'boolean'];
                // Act
                const result = utility.hasSameTypeData(true, 1, supportedTypes);
                // Assert
                expect(result).toBe(true);
            });
        });

        describe('isObject(arg)', () => {
            it(`should check whether argument is object type or not`, () => {
                expect(utility.isObject({a:1})).toBe(true);
                expect(utility.isObject({})).toBe(true);
                expect(utility.isObject(true)).toBe(false);
                expect(utility.isObject('text')).toBe(false);
                expect(utility.isObject([])).toBe(false);
            });

            it(`should return false for falsy value in argument`, () => {
                expect(utility.isObject('')).toBe(false);
                expect(utility.isObject(false)).toBe(false);
                expect(utility.isObject(null)).toBe(false);
                expect(utility.isObject(undefined)).toBe(false);
            });
        });

        describe('getType(arg)', () => {
            it('should provide type of argument', () => {
                expect(utility.getType(function(){})).toEqual(ValidTypes.Function);
                expect(utility.getType('text')).toEqual(ValidTypes.String);
                expect(utility.getType(1234)).toEqual(ValidTypes.Number);
                expect(utility.getType({value: 1234})).toEqual(ValidTypes.Object);
                expect(utility.getType('')).toEqual(ValidTypes.String);
                expect(utility.getType([{value: 1234}])).toEqual(ValidTypes.Array);
                expect(utility.getType(false)).toEqual(ValidTypes.Boolean);
                expect(utility.getType(null)).toEqual('null');
                expect(utility.getType(undefined)).toEqual('undefined');
            })
        });
  });
});
