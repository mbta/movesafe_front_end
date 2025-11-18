import { colors, metrics } from '@repo/themes';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
	width: ${metrics.fullscreen};
  height: ${metrics.fullscreen};
  flex-direction: column;
  align-items: center;
  justify-content: center;
	box-shadow: none;
	position: absolute;
  background-color: ${colors.primaryBlue};
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 70%;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.xLargePadding};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${metrics.largePadding};
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
        font-size: 25px;
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
        font-size: 14px;
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

export const AppTitle = styled.span`
  margin-top: 1em;
  font-weight: 500;
  font-size: 38px;
  margin-bottom: 16px;
  color: ${colors.white};
`;