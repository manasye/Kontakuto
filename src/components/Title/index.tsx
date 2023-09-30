import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Icons from '../Icons';
import { colorToken } from '../../tokens/color';
import { useNavigate } from 'react-router-dom';

interface Props {
    text: string;
    color?: string;
    withArrowBack?: boolean;
}

const StyledH2 = styled.h2`
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    color: ${(props) => props.color || colorToken.gray};
`;

export default function Title({ text, color, withArrowBack }: Props) {
    const navigate = useNavigate();
    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <StyledH2 color={color}>
            {withArrowBack && (
                <Icons
                    name="arrow_back"
                    color={colorToken.gray}
                    className="mr-4 cursor-pointer"
                    onClick={handleBack}
                />
            )}
            {text}
        </StyledH2>
    );
}
