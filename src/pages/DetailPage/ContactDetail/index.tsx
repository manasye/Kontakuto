import React from "react";
import Text from "../../../components/Text";
import styled from "@emotion/styled";

export interface ContactDetailProps {
  firstName: string;
  lastName: string;
  phoneNumbers: { value: string }[];
}

const Container = styled.div`
  padding-bottom: 12px;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0 0;

  @media (min-width: 768px) {
    flex-direction: row;
    div {
      flex: 1;
      align-self: flex-start;
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
`;

const StyledUl = styled.ul`
  margin: 8px 0;
  padding-inline-start: 32px;
`;

export default function ContactDetail({
  firstName,
  lastName,
  phoneNumbers,
}: ContactDetailProps) {
  return (
    <Container>
      <NameContainer>
        <div>
          <Text text="First Name" />
          <Text text={firstName} className="font-medium" />
        </div>
        <div>
          <Text text="Last Name" />
          <Text text={lastName} className="font-medium" />
        </div>
      </NameContainer>
      <Text text="Phone Numbers" className="pt-4" />
      <StyledUl>
        {phoneNumbers.map(({ value: number }) => (
          <li key={number}>
            <Text text={number} className="font-medium" />
          </li>
        ))}
      </StyledUl>
    </Container>
  );
}
