import React from 'react';
import TextInput from '../../../components/Input/Input';
import styled from '@emotion/styled';

const Container = styled.div`
    margin-top: 16px;
`;

export default function InputForm() {
    return (
        <Container>
            <TextInput
                label="Name"
                value="aaa"
                onChange={() => {}}
                disabled={true}
            />
        </Container>
    );
}
