import styled from "@emotion/styled";
import { colorToken } from "../../tokens/color";

export const SkeletonBarContainer = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${colorToken.lightGray};
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const SkeletonBarAnimation = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
