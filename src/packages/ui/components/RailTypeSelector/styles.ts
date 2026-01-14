import styled from "styled-components";
import { metrics, colors, fonts } from "@repo/themes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${metrics.defaultPadding};
  padding-left: 0;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: ${metrics.largePadding};
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: sans-serif;
  font-size: ${fonts.medium};
  color: ${colors.darkGray};
  padding: 5px;
  padding-left: 0;
`;

export const RadioInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: ${metrics.iconSmall};
  height: ${metrics.iconSmall};
  margin-right: 15px;
  vertical-align: middle;
  background-color: ${colors.softWhiteBlue};
  border-radius: ${metrics.borderRadiusRounded};
  border: ${metrics.borderWidth} solid ${colors.black};
  cursor: pointer;
  position: relative;

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    background-color: ${colors.primaryBlue};
    border-radius: ${metrics.borderRadiusRounded};
    transform: translate(-50%, -50%);
  }
`;
