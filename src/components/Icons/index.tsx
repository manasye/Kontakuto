import React, { SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';

const StyledIcon = styled.span<{
    fontSize?: string;
    color?: string;
    hoverColor?: string;
}>`
    font-size: ${({ fontSize }) => fontSize || '16px'};
    color: ${({ color }) => color || 'rgb(148, 148, 149)'};
    transition: color 0.3s ease;

    &:hover {
        color: ${({ hoverColor, color }) => hoverColor || color};
    }
`;

interface Props {
    name: string;
    fontSize?: string;
    color?: string;
    hoverColor?: string;
    className?: string;
    onClick?: (e: SyntheticEvent) => void;
}

export default function Icons({
    name,
    fontSize,
    color,
    hoverColor,
    className,
    onClick
}: Props) {
    return (
        <StyledIcon
            fontSize={fontSize}
            color={color}
            hoverColor={hoverColor}
            className={clsx('material-icons', className)}
            onClick={onClick}>
            {name}
        </StyledIcon>
    );
}
