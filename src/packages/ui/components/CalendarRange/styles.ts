import styled, { createGlobalStyle } from "styled-components";
import { colors, metrics, fonts } from "@repo/themes";

export const StyledDatePickerContainer = styled.div`
  cursor: pointer;
  position: relative;
  .react-datepicker-wrapper {
    width: ${metrics.fullscreen};
  }

  .react-datepicker__input-container input {
    cursor: pointer;
    font-family: sans-serif;
    font-size: ${fonts.regular};
    height: 20px;
		width: 210px;
    padding: ${metrics.defaultPadding} 40px ${metrics.defaultPadding} 10px;
    border: ${metrics.borderDoubleWidth} solid ${colors.primaryBlue};
    border-radius: ${metrics.borderRadius};
    color: ${colors.primaryBlue};
  }
`;
