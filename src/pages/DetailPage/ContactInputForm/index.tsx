import React from 'react';
import TextInput from '../../../components/Input/Input';
import styled from '@emotion/styled';
import { ContactDetailProps, NameContainer } from '../ContactDetail';
import { InputContainer, Label } from '../../../components/Input/Input.style';
import Button from '../../../components/Button';
import Icons from '../../../components/Icons';

interface Props extends ContactDetailProps {
    handleCancel: () => void;
}

const Container = styled.div`
    padding-bottom: 12px;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

export default function InputForm({
    firstName,
    lastName,
    phoneNumbers,
    handleCancel
}: Props) {
    return (
        <Container>
            <NameContainer>
                <TextInput
                    label="First Name"
                    value={firstName}
                    onChange={() => {}}
                />
                <TextInput
                    label="Last Name"
                    value={lastName}
                    onChange={() => {}}
                />
            </NameContainer>
            <InputContainer>
                <Label>Phone Number</Label>
                {phoneNumbers.map((number) => (
                    <TextInput
                        value={number}
                        onChange={() => {}}
                        appendedButton={
                            <Button variant="danger" size="sm">
                                <Icons name="delete" color="white" />
                            </Button>
                        }
                    />
                ))}
            </InputContainer>

            <ButtonContainer>
                <Button
                    variant="secondary"
                    onClick={handleCancel}
                    className="mr-8">
                    Cancel
                </Button>
                <Button variant="primary">Save</Button>
            </ButtonContainer>
        </Container>
    );
}
