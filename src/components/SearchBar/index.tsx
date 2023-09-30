import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 4px auto 16px;
`;

const Input = styled.input`
    flex-grow: 1;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
`;

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
    };

    return (
        <SearchInputContainer>
            <Input
                type="text"
                placeholder="Search contact here..."
                value={value}
                onChange={handleChange}
            />
        </SearchInputContainer>
    );
};

export default SearchInput;
