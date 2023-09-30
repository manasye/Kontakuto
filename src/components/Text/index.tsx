import React from 'react';
import styled from '@emotion/styled';

interface Props {
    text: string;
    color?: string;
}

const StyledText = styled.p`
    font-size: 15px;
    margin: 4px 0;
    color: ${(props) => props.color || 'rgb(148, 148, 149)'};
`;

export default function Text({ text, color }: Props) {
    return <StyledText color={color}>{text}</StyledText>;
}
