import React from 'react';
import { InputContainer, InputField, Label } from './Input.style';

interface TextInputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    value,
    onChange,
    disabled
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <InputField
                type="text"
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
        </InputContainer>
    );
};

export default TextInput;
