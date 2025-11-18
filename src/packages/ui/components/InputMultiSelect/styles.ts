import { fonts, metrics } from "@repo/themes";
import styled, { css } from "styled-components";

interface ContainerProps {
  $width?: string;
  $height?: string;
}

export const InputTitle = styled.span`
  font-size: ${fonts.small};
  font-weight: bold;
  margin-bottom: ${metrics.smallPadding};
`;

export const Content = styled.div<ContainerProps>`
  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `}

  ${(props) =>
    props.$height &&
    css`
      height: ${props.$height};
    `}
`;
