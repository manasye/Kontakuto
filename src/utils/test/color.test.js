import { generateColorFromInitials } from '../color';

const validHexRegex = /^#[0-9A-F]{6}$/i;

describe('generateColorFromInitials', () => {
    it('should generate a valid color based on initials', () => {
        const color1 = generateColorFromInitials('MB');
        expect(color1).toMatch(validHexRegex);

        const color2 = generateColorFromInitials('UO');
        expect(color2).toMatch(validHexRegex);
    });
});
