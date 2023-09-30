import React from 'react';
import styled from '@emotion/styled';

interface Props {
    text: string;
    color?: string;
}

const StyledH2 = styled.h2`
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 8px;
    color: ${(props) => props.color || 'rgb(77, 77, 79)'};
`;

export default function Title({ text, color }: Props) {
    return <StyledH2 color={color}>{text}</StyledH2>;
}
