import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
    background-color: #333;
    color: #fff;
    padding: 8px 10px;
    display: flex;
    min-height: 34px;

    @media (min-width: 768px) {
        padding: 10px;
    }
`;

export const ContentContainer = styled.div`
    max-width: 1024px;
    width: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
`;

export const MainText = styled.h1`
    font-size: 21px;
    margin: 0;

    @media (min-width: 768px) {
        font-size: 24px;
    }
`;

export const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 15px;

    &:hover {
        background-color: #0056b3;
    }
`;
