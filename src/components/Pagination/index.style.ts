import styled from '@emotion/styled';
import { colorToken } from '../../tokens/color';

export const PaginationContainer = styled.nav`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const PaginationList = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
`;

export const PageItem = styled.li`
    margin: 0 5px;
`;

export const PageLink = styled.button<{ active: boolean }>`
    background-color: ${(props) =>
        props.active ? colorToken.blue : 'transparent'};
    color: ${(props) => (props.active ? '#fff' : colorToken.blue)};
    border: 1px solid #007bff;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #0056b3;
        color: #fff;
    }
`;
