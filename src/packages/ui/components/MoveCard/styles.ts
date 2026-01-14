import styled from 'styled-components';
import { metrics, colors, fonts } from "@repo/themes";

export const CardContainer = styled.div`
	border: 1px solid ${colors.blueGray};
	border-radius: ${metrics.borderRadius};
	background-color: ${colors.paleBlueGray};
	padding: ${metrics.defaultPadding};
	display: flex;
	flex-direction: column;
	margin-bottom: ${metrics.largePadding};
`;

export const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const FromToContainer = styled(RowContainer)`
	justify-content: left;
`

export const CardImgContainer = styled.div`
  margin: 0px ${metrics.largePadding} 0px ${metrics.defaultPadding};
`;

export const InformationText = styled.span`
	font-size: ${fonts.xxxLarge};
	font-weight: 500;
	padding-top: ${metrics.defaultPadding};
	padding-bottom: ${metrics.largePadding};
	padding-right: ${metrics.defaultPadding};
	word-break: break-word;

	@media (max-width: 768px) {
      font-size: ${fonts.xxLarge};
  	}
`

export const LabelText = styled(InformationText)`
	color: ${colors.gray};
`