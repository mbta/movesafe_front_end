import styled, { css } from "styled-components";
import { colors } from "@repo/themes";

interface ButtonProps {
  primary?: boolean;
  secundary?: boolean;
  size?: "small" | "large";
  noBorder?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0px;
  border-radius: 4px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.primary
      ? css`
          background-color: ${colors.white};
          border: ${props.noBorder
            ? "none"
            : `2px solid ${colors.primaryBlue}`};
          &:active {
            background-color: ${colors.offWhite};
          }
        `
      : css`
          background-color: ${colors.darkBlue};
          border: ${props.noBorder ? "none" : `1px solid ${colors.white}`};
          &:active {
            background-color: ${colors.deepBlue};
          }
        `}
`;
