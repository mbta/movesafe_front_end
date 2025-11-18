import styled from 'styled-components';
import { metrics, colors, fonts } from "@repo/themes";

export const TAB_VARIANT_BLUE = 'blue';
export const TAB_VARIANT_WHITE = 'white';

export const Container = styled.div<{ variant?: typeof TAB_VARIANT_BLUE | typeof TAB_VARIANT_WHITE }>`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const TabList = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-bottom: ${metrics.largePadding};
`;

export const TabIndicator = styled.div<{ 'data-active': boolean; variant?: typeof TAB_VARIANT_BLUE | typeof TAB_VARIANT_WHITE }>`
	height: ${props => (
		props.variant === TAB_VARIANT_WHITE ?
			metrics.borderWidth :
			metrics.smallMargin
	)};
	background-color: ${props => (
		props.variant === TAB_VARIANT_WHITE ?
			(props['data-active'] ? colors.primaryBlue : colors.softWhiteBlue) :
			(props['data-active'] ? colors.softBlue : colors.primaryBlue)
	)};
`;


export const TabItem = styled.div<{ 'data-active': boolean; variant?: typeof TAB_VARIANT_BLUE | typeof TAB_VARIANT_WHITE }>`
	flex: 1;
	padding: ${metrics.largePadding} ${metrics.xLargePadding} 0px ${metrics.xLargePadding};
	cursor: pointer;
	background-color: ${props => (
		props.variant === TAB_VARIANT_WHITE ?
			colors.softWhiteBlue :
			colors.primaryBlue
	)};
	color: ${props => (
		props.variant === TAB_VARIANT_WHITE ?
			(props['data-active'] ? colors.primaryBlue : colors.gray) :
			colors.offWhite
	)};
`;

export const TabContent = styled.div`
	padding:  ${metrics.smallPadding} ${metrics.largePadding} ${metrics.smallPadding} ${metrics.largePadding};
	border-top: none;
`;

export const OptionText = styled.span`
	font-size: ${fonts.large};
	font-weight: 500;

	@media (max-width: 768px) {
        font-size: ${fonts.medium};
      }
`;

export const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Badge = styled.div`
	width: 1.2em;
	height: 1.2em;
	border-radius: 50%;
	background-color: ${colors.mustard};
	color: ${colors.white};
	text-align: center;
	margin-left: 0.5em;
    margin-top: -0.4em;
	padding: 0.1em;
	font-size: ${fonts.small};
`;