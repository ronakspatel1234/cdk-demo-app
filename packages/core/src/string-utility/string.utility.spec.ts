import { StringUtility } from './string.utility';


describe('StringUtilities', () => {
    const utility = StringUtility;

  beforeEach(() => {

  });
  
  describe('on initialization', () => {
      it('should have convertToPascalCase()', () => {
        expect(utility.convertToPascalCase).toBeDefined();
      });
  });

  describe('on method invokation', () => {
    describe('convertToPascalCase', () => {
        it('should convert value in pascal case', () => {
            expect(utility.convertToPascalCase('ABCD')).toEqual('Abcd');
            expect(utility.convertToPascalCase('abcd')).toEqual('Abcd');
            expect(utility.convertToPascalCase('Abcd')).toEqual('Abcd');
            expect(utility.convertToPascalCase('')).toEqual(null);
        });

        it('should return null for falsy value', () => {
            expect(utility.convertToPascalCase('')).toEqual(null);
            expect(utility.convertToPascalCase('0')).toEqual(null);
        });

        it('should return null for value holds number', () => {
            expect(utility.convertToPascalCase('12233')).toEqual(null);
            expect(utility.convertToPascalCase('Ab12233')).toEqual(null);
        })
    });
  });
});
