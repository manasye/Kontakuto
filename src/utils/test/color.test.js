import { generateColorFromInitials } from '../color';

describe('generateColorFromInitials', () => {
    it('should generate a valid color based on initials', () => {
        const color1 = generateColorFromInitials('MB');
        expect(color1).toMatch(/^#[0-9A-F]{6}$/i);

        const color2 = generateColorFromInitials('UO');
        expect(color2).toMatch(/^#[0-9A-F]{6}$/i);
    });
});
