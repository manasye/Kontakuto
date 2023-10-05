import React from "react";
import styled from "@emotion/styled";
import { colorToken } from "../../tokens/color";

interface Props {
  text: string;
  color?: string;
  className?: string;
}

const StyledText = styled.p`
  font-size: 16px;
  margin: 4px 0;
  color: ${(props) => props.color || colorToken.gray};
`;

export default function Text({ text, color, className }: Props) {
  return (
    <StyledText color={color} className={className}>
      {text}
    </StyledText>
  );
}
