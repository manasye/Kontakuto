import { comparePhoneNumbers } from '../phoneNumber';

describe('comparePhoneNumbers function', () => {
    it('should correctly identify new, deleted, and edited phone numbers', () => {
        const oldPhoneNumbers = [
            { id: 1, value: '123-456-7890' },
            { id: 2, value: '987-654-3210' },
            { id: 3, value: '555-123-4567' }
        ];

        const newPhoneNumbers = [
            { id: 2, value: '987-654-3210' }, // Unchanged
            { id: 4, value: '888-888-8888' }, // New
            { id: 1, value: '999-999-9999' } // Edited
        ];

        const result = comparePhoneNumbers(oldPhoneNumbers, newPhoneNumbers);

        expect(result.newNumbers).toEqual([{ id: 4, value: '888-888-8888' }]);
        expect(result.deletedNumbers).toEqual([
            { id: 3, value: '555-123-4567' }
        ]);
        expect(result.editedNumbers).toEqual([
            { id: 1, value: '999-999-9999' }
        ]);
    });

    it('should handle cases where there are no changes', () => {
        const oldPhoneNumbers = [
            { id: 1, value: '123-456-7890' },
            { id: 2, value: '987-654-3210' }
        ];

        const newPhoneNumbers = [
            { id: 1, value: '123-456-7890' },
            { id: 2, value: '987-654-3210' }
        ];

        const result = comparePhoneNumbers(oldPhoneNumbers, newPhoneNumbers);

        expect(result.newNumbers).toEqual([]);
        expect(result.deletedNumbers).toEqual([]);
        expect(result.editedNumbers).toEqual([]);
    });

    it('should handle cases where all phone numbers are new', () => {
        const oldPhoneNumbers = [];

        const newPhoneNumbers = [
            { id: 1, value: '123-456-7890' },
            { id: 2, value: '987-654-3210' }
        ];

        const result = comparePhoneNumbers(oldPhoneNumbers, newPhoneNumbers);

        expect(result.newNumbers).toEqual([
            { id: 1, value: '123-456-7890' },
            { id: 2, value: '987-654-3210' }
        ]);
        expect(result.deletedNumbers).toEqual([]);
        expect(result.editedNumbers).toEqual([]);
    });

    it('should handle cases where all phone numbers are deleted', () => {
        const oldPhoneNumbers = [
            { id: 1, value: '123-456-7890' },
            { id: 2, value: '987-654-3210' }
        ];

        const newPhoneNumbers = [];

        const result = comparePhoneNumbers(oldPhoneNumbers, newPhoneNumbers);

        expect(result.newNumbers).toEqual([]);
        expect(result.deletedNumbers).toEqual([
            { id: 1, value: '123-456-7890' },
            { id: 2, value: '987-654-3210' }
        ]);
        expect(result.editedNumbers).toEqual([]);
    });
});
