import React from "react";
import styled from "@emotion/styled";

const LoadingIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border: 4px solid transparent;
  border-top: 4px solid white;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingIcon: React.FC = () => {
  return (
    <LoadingIconContainer>
      <Circle />
    </LoadingIconContainer>
  );
};

export default LoadingIcon;
