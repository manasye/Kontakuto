import { comparePhoneNumbers } from "../phoneNumber";

describe("comparePhoneNumbers function", () => {
  it("should correctly identify new, deleted, and edited phone numbers", () => {
    const oldPhoneNumbers = [
      { id: 1, value: "08267448335" },
      { id: 2, value: "0867564486065" },
      { id: 3, value: "08317283045" },
    ];

    const newPhoneNumbers = [
      { id: 2, value: "0867564486065" }, // Unchanged
      { id: 4, value: "08328985104" }, // New
      { id: 1, value: "08878814830" }, // Edited
    ];

    const result = comparePhoneNumbers(oldPhoneNumbers, newPhoneNumbers);

    expect(result.newNumbers).toEqual([{ id: 4, value: "08328985104" }]);
    expect(result.deletedNumbers).toEqual([{ id: 3, value: "08317283045" }]);
    expect(result.editedNumbers).toEqual([{ id: 1, value: "08878814830" }]);
  });

  it("should handle cases where there are no changes", () => {
    const oldPhoneNumbers = [
      { id: 1, value: "08267448335" },
      { id: 2, value: "0867564486065" },
    ];

    const newPhoneNumbers = [
      { id: 1, value: "08267448335" },
      { id: 2, value: "0867564486065" },
    ];

    const result = comparePhoneNumbers(oldPhoneNumbers, newPhoneNumbers);

    expect(result.newNumbers).toEqual([]);
    expect(result.deletedNumbers).toEqual([]);
    expect(result.editedNumbers).toEqual([]);
  });

  it("should handle cases where all phone numbers are new", () => {
    const oldPhoneNumbers = [];

    const newPhoneNumbers = [
      { id: 1, value: "08267448335" },
      { id: 2, value: "0867564486065" },
    ];

    const result = comparePhoneNumbers(oldPhoneNumbers, newPhoneNumbers);

    expect(result.newNumbers).toEqual([
      { id: 1, value: "08267448335" },
      { id: 2, value: "0867564486065" },
    ]);
    expect(result.deletedNumbers).toEqual([]);
    expect(result.editedNumbers).toEqual([]);
  });

  it("should handle cases where all phone numbers are deleted", () => {
    const oldPhoneNumbers = [
      { id: 1, value: "08267448335" },
      { id: 2, value: "0867564486065" },
    ];

    const newPhoneNumbers = [];

    const result = comparePhoneNumbers(oldPhoneNumbers, newPhoneNumbers);

    expect(result.newNumbers).toEqual([]);
    expect(result.deletedNumbers).toEqual([
      { id: 1, value: "08267448335" },
      { id: 2, value: "0867564486065" },
    ]);
    expect(result.editedNumbers).toEqual([]);
  });
});
