import { colors, fonts, metrics } from "@repo/themes";
import styled, { css } from "styled-components";

interface SelectProps {
  $size?: string;
}

interface ContainerProps {
  $width?: string;
}

export const DataListInput = styled.input<SelectProps>`
  display: flex;
  width: ${metrics.fullscreen};
  height: 18px;
  background-color: ${colors.offWhite};
  border-radius: 4px;
  border: 1px solid ${colors.primaryBlue};
  padding: ${metrics.defaultPadding};
  font-size: ${fonts.small};
  color: ${colors.black};

  ::placeholder {
    font-size: ${fonts.large};
    color: ${colors.blueGray};
  }

  ${(props) =>
    props.$size === "small" &&
    css`
      width: 70px;
    `}

  ${(props) =>
    props.$size === "medium" &&
    css`
      min-width: 180px;
      max-width: 180px;
    `}

    ${(props) =>
    props.$size === "medium2" &&
    css`
      width: 280px;
    `}
  

  ${(props) =>
    props.$size === "large" &&
    css`
      min-width: ${metrics.selectLargeWidth};
      max-width: ${metrics.selectLargeWidth};
    `}

      ${(props) =>
    props.$size === "large2" &&
    css`
      width: 510px;
    `}

    
  ${(props) =>
    props.$size === "full" &&
    css`
      width: calc(100% - 20px);
    `}
`;

export const InputTitle = styled.span`
  font-size: ${fonts.small};
  font-weight: bold;
  margin-bottom: ${metrics.smallPadding};
  white-space: nowrap;
`;

export const Content = styled.div<ContainerProps>`
  width: 100%;
  height: 60px;
`;
