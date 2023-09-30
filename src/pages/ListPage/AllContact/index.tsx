import React, { useState } from 'react';
import ContactContainer from '../../../components/ContactContainer';
import Title from '../../../components/Title';
import ContactCard from '../../../components/ContactCard';
import SearchInput from '../../../components/SearchBar';

export default function AllContact() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    // Dummy contact data
    const contacts = [
        { name: 'Alice Brown', phoneNumber: '123-456-7890' },
        { name: 'Charlie Davis', phoneNumber: '987-654-3210' },
        { name: 'Emily Foster', phoneNumber: '555-123-4567' },
        { name: 'Charlie Davis', phoneNumber: '987-654-3210' },
        { name: 'Emily Foster', phoneNumber: '555-123-4567' },
        { name: 'Alice Brown', phoneNumber: '123-456-7890' }
        // Add more contacts as needed
    ];

    return (
        <>
            <Title text="All Contacts (0)" />
            <SearchInput value={searchValue} onChange={handleSearchChange} />
            <ContactContainer>
                {contacts.map((contact, index) => (
                    <ContactCard key={index} {...contact} />
                ))}
            </ContactContainer>
        </>
    );
}
