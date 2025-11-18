import styled, { createGlobalStyle } from "styled-components";
import { colors, metrics, fonts } from "@repo/themes";

export const DatePickerOverrides = createGlobalStyle`
	.react-datepicker {
		font-family: sans-serif;
	}

	.react-datepicker__day--selected {
		background-color: ${colors.primaryBlue};
		color: ${colors.softWhiteBlue};
	}

	.react-datepicker__day--keyboard-selected {
		background-color: ${colors.softBlue};
		color: ${colors.darkBlue};
	}

	.react-datepicker__day {
		&:hover {
			background-color: ${colors.softBlue};
			color: ${colors.darkBlue};
		}
	}
`;

export const StyledDatePickerContainer = styled.div`
  cursor: pointer;
  position: relative;
	background-color: yellowgreen;
	margin-left: 40px;
  .react-datepicker-wrapper {
    width: ${metrics.fullscreen};
  }

  .react-datepicker__input-container input {
    cursor: pointer;
    font-family: sans-serif;
    font-size: ${fonts.regular};
    width: 88%;
    height: 20px;
    padding: ${metrics.defaultPadding} ${metrics.defaultPadding} ${metrics.defaultPadding} 15px;
    border: ${metrics.borderDoubleWidth} solid ${colors.primaryBlue};
    border-radius: ${metrics.borderRadius};
    color: ${colors.primaryBlue};
  }
`;
