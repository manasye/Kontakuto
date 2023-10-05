import styled from "@emotion/styled";
import { colorToken } from "../../tokens/color";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const InputField = styled.input<{ disabled?: boolean; error?: boolean }>`
  padding: 8px;
  border: 1px solid ${(props) => (props.error ? colorToken.red : "#ccc")};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  flex: 1;

  &:focus {
    border-color: ${colorToken.blue};
  }

  &:disabled {
    background-color: ${colorToken.gray};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: ${colorToken.red};
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 0;
`;

export const InputWithAppendWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const AppendedButtonWrapper = styled.div`
  margin-left: 8px;
  display: flex;
`;
