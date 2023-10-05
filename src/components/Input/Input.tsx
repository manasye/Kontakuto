import React, { ReactNode } from "react";
import {
  AppendedButtonWrapper,
  ErrorText,
  InputContainer,
  InputField,
  InputWithAppendWrapper,
  Label,
} from "./Input.style";

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string;
  appendedButton?: ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  disabled,
  errorMessage,
  appendedButton,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      {appendedButton ? (
        <InputWithAppendWrapper>
          <InputField
            type="text"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            error={Boolean(errorMessage)}
          />
          <AppendedButtonWrapper>{appendedButton}</AppendedButtonWrapper>
        </InputWithAppendWrapper>
      ) : (
        <InputField
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          error={Boolean(errorMessage)}
        />
      )}

      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </InputContainer>
  );
};

export default TextInput;
