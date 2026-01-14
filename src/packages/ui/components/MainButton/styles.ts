import { colors, fonts, metrics } from "@repo/themes";
import styled, { css } from "styled-components";

interface ButtonProps {
  $disabled?: boolean;
  $primary?: boolean;
  $size?: string;
  $color?: string;
  $invertedColors?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: ${metrics.smallPadding} ${metrics.defaultPadding};
  border-radius: ${metrics.borderRadius};
  border: 0px;
  height: 42px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  ${(props) =>
    props.$primary &&
    props.$disabled &&
    css`
      background-color: ${colors.neutralGray};
      color: ${colors.white};
    `}

  ${(props) =>
    props.$primary &&
    !props.$disabled &&
    css`
      background-color: ${colors.primaryBlue};
      color: ${colors.white};
      &:hover {
        background-color: ${colors.deepBlue};
      }
      &:active {
        background-color: ${colors.darkBlue};
      }
    `}

  ${(props) =>
    !props.$primary &&
    props.$disabled &&
    css`
      background-color: ${colors.white};
      border: ${metrics.borderWidth} solid ${colors.neutralGray};
      color: ${colors.neutralGray};
      cursor: not-allowed;
    `}

  ${(props) =>
    !props.$primary &&
    !props.$disabled &&
    css`
      background-color: ${colors.white};
      border: ${metrics.borderWidth} solid ${props.$color};
      color: ${props.$color};
      &:hover {
        background-color: ${colors.pastelBlue};
      }
      &:active {
        background-color: ${colors.skyBlue};
      }
    `}

  ${(props) =>
    props.$size === "small" &&
    css`
      padding: 5px 10px;
      height: ${metrics.buttonWebHeight};
      border-width: 2px;
      padding: ${metrics.defaultPadding};
    `}

    ${(props) =>
    props.$size === "medium" &&
    css`
      height: ${metrics.buttonWebHeight};
      width: 16em;
    `}
    
  ${(props) =>
    props.$size === "large" &&
    css`
      height: ${metrics.buttonWebHeight};
      width: 100%;
    `}

  ${(props) =>
    props.$size === "full" &&
    css`
      height: 40px;
      width: ${metrics.fullscreen};
    `}

    ${(props) =>
    props.$invertedColors &&
    css`
      background-color: ${colors.white};
      color: ${colors.primaryBlue};
      &:hover {
        background-color: ${colors.pastelBlue};
      }
      &:active {
        background-color: ${colors.softBlue};
      }
    `}
`;

export const TextButton = styled.span<ButtonProps>`
  font-size: ${fonts.regular};
  ${(props) =>
    props.$size === "small" &&
    css`
      font-size: ${fonts.medium};
    `}

  ${(props) =>
    props.$size === "full" &&
    css`
      font-size: 25px;
    `}
`;
