import styled from '@emotion/styled';

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;

export const Label = styled.label`
    font-size: 14px;
    margin-bottom: 8px;
`;

export const InputField = styled.input<{ disabled?: boolean }>`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007bff;
    }

    &:disabled {
        background-color: #f0f0f0;
        cursor: not-allowed;
    }
`;
