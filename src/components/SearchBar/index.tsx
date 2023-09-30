import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import Icons from '../Icons';

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 4px auto 16px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Input = styled.input`
    flex-grow: 1;
    border: none;
    font-size: 16px;
    outline: none;
    margin-left: 4px;
    x ::placeholder {
        color: rgb(148, 148, 149);
    }
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
            <InputWrapper>
                <Icons name="search" />
                <Input
                    type="text"
                    placeholder="Search contact here..."
                    value={value}
                    onChange={handleChange}
                />
            </InputWrapper>
        </SearchInputContainer>
    );
};

export default SearchInput;
