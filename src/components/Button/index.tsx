import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    display: flex;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease-in-out;
    align-items: center;

    &:hover {
        background-color: #0056b3;
    }

    @media (min-width: 768px) {
        font-size: 15px;
    }
`;

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
    return (
        <StyledButton onClick={onClick} className={className}>
            {children}
        </StyledButton>
    );
};

export default Button;
