import React from 'react';
import styled from '@emotion/styled';

const DividerLine = styled.hr`
    border: none;
    border-top: 1px solid rgb(226, 226, 227);
    margin: 16px 0;
`;

const Divider: React.FC = () => {
    return <DividerLine />;
};

export default Divider;
