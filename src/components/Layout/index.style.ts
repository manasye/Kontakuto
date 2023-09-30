import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 12px;

    @media (min-width: 768px) {
        gap: 16px;
    }
`;

export const LayoutContent = styled.main`
    width: calc(100% - 20px);
    max-width: 1024px;
    margin: 0 auto;
    min-height: 100%;
    padding: 0 10px;
`;
