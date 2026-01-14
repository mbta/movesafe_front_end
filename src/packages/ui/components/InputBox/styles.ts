import { colors, fonts, metrics } from "@repo/themes";
import styled, { css } from "styled-components";

const sizeStyles = {
  large: css`
    font-size: ${fonts.large};
    height: 40px;
  `,
  regular: css`
    font-size: ${fonts.regular};
    height: 30px;
  `,
  small: css`
    font-size: ${fonts.small};
    height: 20px;
    width: 100%;
  `,
  login: css`
    font-size: ${fonts.regular};
    height: 30px;
    width: 96%;
  `,
};

const placeholderStyles = {
  large: css`
    font-size: ${fonts.large};
  `,
  regular: css`
    font-size: ${fonts.regular};
  `,
  small: css`
    font-size: ${fonts.small};
  `,
  login: css`
    font-size: ${fonts.regular};
  `,
};

export const DefaultInput = styled.input<{
  size: "large" | "regular" | "small" | "login";
}>`
  background-color: ${colors.offWhite};
  border-radius: 4px;
  border: 1px solid ${colors.primaryBlue};
  padding: 9px;
  width: 98%;
  ${({ size }) => sizeStyles[size]}

  ::placeholder {
    ${({ size }) => placeholderStyles[size]}
    color: ${colors.blueGray};
  }

  &::-webkit-input-placeholder {
    ${({ size }) => placeholderStyles[size]}
    color: ${colors.blueGray};
  }
`;

export const InputTitle = styled.span<{
  size: "large" | "regular" | "small" | "login";
}>`
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: ${metrics.smallPadding};
  ${({ size }) => sizeStyles[size]}
`;

export const LimitWarningText = styled.p`
  font-size: 12px;
  color: red;
  text-align: left;
  margin-top: 5px;
`;
