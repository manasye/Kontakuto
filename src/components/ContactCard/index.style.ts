import styled from '@emotion/styled';
import { colorToken } from '../../tokens/color';

export const ContactCardContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }

    @media (min-width: 768px) {
        padding: 12px;
    }
`;

export const Avatar = styled.div<{ bgColor?: string }>`
    width: 48px;
    height: 48px;
    background-color: ${(props) => props.bgColor || colorToken.blue};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 20px;
`;

export const ContactRightSide = styled.div`
    margin-left: 16px;
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
`;

export const Name = styled.h3`
    font-size: 18px;
    margin: 0;
    color: ${colorToken.gray};
`;

export const PhoneNumber = styled.p`
    font-size: 14px;
    margin: 0;
    color: rgb(148, 148, 149);
`;

export const ActionButtons = styled.div`
    display: flex;
`;
