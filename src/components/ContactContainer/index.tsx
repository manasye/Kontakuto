import React, { ReactNode } from "react";
import styled from "@emotion/styled";

const ContactCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 0 auto;
  max-width: 1024px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }
`;
type ContactContainerProps = {
  children: ReactNode;
};

const ContactContainer: React.FC<ContactContainerProps> = ({ children }) => {
  return <ContactCardGrid>{children}</ContactCardGrid>;
};

export default ContactContainer;
