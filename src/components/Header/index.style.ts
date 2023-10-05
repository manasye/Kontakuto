import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  padding: 8px 10px;
  display: flex;
  min-height: 34px;
  position: fixed;
  top: 0;
  width: calc(100vw - 20px);

  @media (min-width: 768px) {
    padding: 10px;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const MainText = styled.h1`
  font-size: 21px;
  margin: 0;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;
