import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: center;
`;

export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
`;

interface TitleProps {
  $fontSetting?: "H1" | "H2" | "H3" | "H0";
}

export const Title = styled.p<TitleProps>`
  font-family: sans-serif;
  ${(props) =>
    props.$fontSetting === "H0" &&
    css`
      font-weight: 500;
      font-size: 32px;
    `}
  ${(props) =>
    props.$fontSetting === "H1" &&
    css`
      font-weight: 500;
      font-size: 20px;

      @media (max-width: 1100px) {
        font-weight: 500;
        font-size: 48px;
      }

      @media (max-width: 768px) {
        font-weight: 500;
        font-size: 16px;
      }
    `}
  ${(props) =>
    props.$fontSetting === "H2" &&
    css`
      font-weight: 500;
      font-size: 16px;

      @media (max-width: 1100px) {
        font-weight: 500;
        font-size: 38px;
      }

      @media (max-width: 768px) {
        font-weight: 500;
        font-size: 25px;
      }
    `}
    ${(props) =>
    props.$fontSetting === "H3" &&
    css`
      font-weight: 500;
      font-size: 16px;

      @media (max-width: 1100px) {
        font-weight: 500;
        font-size: 30px;
      }

      @media (max-width: 768px) {
        font-weight: 500;
        font-size: 25px;
      }
    `}
`;
