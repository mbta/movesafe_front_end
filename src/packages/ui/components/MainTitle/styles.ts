"use client";
import styled, { css } from "styled-components";
import { metrics } from "@repo/themes";

interface TitleProps {
  $fontSetting?: "H1" | "H2" | "H3" | "H0";
  padding?: string;
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

export const LabelTitle = styled(Title)`
  padding-right: ${metrics.defaultPadding};
`;
