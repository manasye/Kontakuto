import React from "react";
import { SkeletonBarAnimation, SkeletonBarContainer } from "./index.style";

interface SkeletonBarProps {
  width?: string;
  height?: string;
}

const SkeletonBar: React.FC<SkeletonBarProps> = ({ width, height }) => {
  return (
    <SkeletonBarContainer style={{ width, height }}>
      <SkeletonBarAnimation />
    </SkeletonBarContainer>
  );
};

export default SkeletonBar;
