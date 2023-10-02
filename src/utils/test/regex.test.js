import { phoneNumberCheck, specialCharacterCheck } from '../regex';

describe('phoneNumberCheck', () => {
    it('should return true for valid values', () => {
        expect(phoneNumberCheck('08134455555')).toBe(true);
        expect(phoneNumberCheck('+6281266661111')).toBe(true);
    });

    it('should return false for invalid values', () => {
        expect(phoneNumberCheck('invalid-value')).toBe(false);
        expect(phoneNumberCheck('0813392')).toBe(false);
    });
});

describe('specialCharacterCheck', () => {
    it('should return true for string with special character', () => {
        const str = 'Hello! World';
        expect(specialCharacterCheck(str)).toBe(true);
    });

    it('should return false for string without special character', () => {
        const str = 'Hello World';
        expect(specialCharacterCheck(str)).toBe(false);
    });
});
