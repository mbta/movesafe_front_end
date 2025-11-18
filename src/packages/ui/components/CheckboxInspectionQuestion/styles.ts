import styled from 'styled-components';
import { metrics, colors, fonts } from "@repo/themes";

export const CheckboxContainer = styled.div`
		display: flex;
		flex-direction: row;
		padding-right: ${metrics.defaultPadding};
		align-items: center;
`;

export const Checker = styled.button<{ selected: boolean, isSmall?: boolean }>`
	width: 5em;
  height: 5em;
	border: ${metrics.borderWidth} solid ${colors.softGray};
	border-radius: ${metrics.borderRadius};
	cursor: pointer;
	padding: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ selected }) => (selected ? colors.red : colors.softWhiteBlue)};
`;