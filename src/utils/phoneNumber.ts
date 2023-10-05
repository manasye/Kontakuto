import { ContactDetailProps } from "../pages/DetailPage/ContactDetail";

export function comparePhoneNumbers(
  oldPhoneNumbers: ContactDetailProps["phoneNumbers"],
  newPhoneNumbers: ContactDetailProps["phoneNumbers"],
) {
  const oldNumberIds = oldPhoneNumbers.map((phoneNumber) => phoneNumber.id);
  const newNumberIds = newPhoneNumbers.map((phoneNumber) => phoneNumber.id);

  const deletedNumbers = oldPhoneNumbers.filter(
    (phoneNumber) => !newNumberIds.includes(phoneNumber.id),
  );
  const newNumbersOnly = newPhoneNumbers.filter(
    (phoneNumber) => !oldNumberIds.includes(phoneNumber.id),
  );

  const editedNumbers: ContactDetailProps["phoneNumbers"] = [];
  const newPhoneNumberMap = newPhoneNumbers.reduce(
    (map: Record<number, string>, phoneNumber) => {
      if (phoneNumber.id) {
        map[phoneNumber.id] = phoneNumber.value;
      }
      return map;
    },
    {},
  );

  for (const oldPhoneNumber of oldPhoneNumbers) {
    if (
      oldPhoneNumber.id &&
      newPhoneNumberMap.hasOwnProperty(oldPhoneNumber.id)
    ) {
      const newValue = newPhoneNumberMap[oldPhoneNumber.id];
      if (newValue !== oldPhoneNumber.value) {
        editedNumbers.push({ id: oldPhoneNumber.id, value: newValue });
      }
    }
  }

  for (const newPhoneNumber of newPhoneNumbers) {
    if (!oldPhoneNumbers.find((old) => old.id === newPhoneNumber.id)) {
      newNumberIds.push(newPhoneNumber.id);
    }
  }

  return {
    newNumbers: newNumbersOnly,
    deletedNumbers,
    editedNumbers,
  };
}
