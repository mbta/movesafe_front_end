import styled from 'styled-components';
import { metrics, colors, fonts } from "@repo/themes";

export const MainContainer = styled.div`
	background-color: ${colors.softWhiteBlue};
	border: ${metrics.borderWidth} solid ${colors.softGray};
	border-radius: ${metrics.borderRadius};
	padding: ${metrics.defaultPadding};
	text-align: center;
  margin-bottom: ${metrics.largePadding};
`;

export const QuestionText = styled.p`
	color: ${colors.black};
	font-size: ${fonts.xxLarge};
	padding-right: ${metrics.defaultPadding};
	text-align: left;

	@media (max-width: 768px) {
		font-size: ${fonts.large};
	}
`;

export const CollapsedInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	align-content: center;
`;

export const OperatorSideTitle = styled.p`
	font-size: ${fonts.regular};
	color: ${colors.darkGray};
	margin-top: ${metrics.smallPadding};
	font-weight: bold;
`
