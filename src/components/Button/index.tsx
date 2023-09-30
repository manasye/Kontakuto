import React from 'react';
import styled from '@emotion/styled';
import { colorToken } from '../../tokens/color';

const variantStyles = {
    primary: {
        backgroundColor: colorToken.blue,
        hoverBackgroundColor: colorToken.darkBlue
    },
    secondary: {
        backgroundColor: 'white',
        hoverBackgroundColor: '#F2F2F2'
    },
    danger: {
        backgroundColor: colorToken.red,
        hoverBackgroundColor: colorToken.darkRed
    }
};

const StyledButton = styled.button<{
    variant?: keyof typeof variantStyles;
    size?: string;
}>`
    background-color: ${(props) =>
        variantStyles[props.variant || 'primary'].backgroundColor};
    color: ${(props) =>
        props.variant === 'secondary' ? colorToken.blue : 'white'};
    padding: ${(props) => (props.size === 'md' ? '8px 16px' : '4px 10px')};
    border: ${(props) =>
        props.variant === 'secondary'
            ? `1px solid ${colorToken.blue}`
            : 'none'};
    display: flex;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease-in-out;
    align-items: center;

    &:hover {
        background-color: ${(props) =>
            variantStyles[props.variant || 'primary'].hoverBackgroundColor};
    }

    @media (min-width: 768px) {
        font-size: 15px;
    }
`;

interface ButtonProps {
    variant?: keyof typeof variantStyles;
    size?: 'sm' | 'md';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    className
}) => {
    return (
        <StyledButton
            onClick={onClick}
            className={className}
            variant={variant}
            size={size}>
            {children}
        </StyledButton>
    );
};

export default Button;
