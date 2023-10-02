import Contact from '../../../hooks/types/Contact';

export const mapContactData = (c: Contact) => {
    return {
        id: c.id,
        firstName: c.first_name,
        lastName: c.last_name,
        phoneNumber: c.phones[0],
        phoneNumbersLength: c.phones.length
    };
};
