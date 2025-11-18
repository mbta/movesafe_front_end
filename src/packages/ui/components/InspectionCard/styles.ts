import styled from 'styled-components';
import colors from '@repo/themes/colors';
import metrics from '@repo/themes/metrics';
import fonts from '@repo/themes/fonts';

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

export const LeftAlignContainer = styled(RowContainer)`
	justify-content: left;
`

export const FormsContainer = styled(LeftAlignContainer)`
	margin-top: ${metrics.defaultPadding};
	margin-bottom: ${metrics.defaultPadding};
`

export const DateTimeText = styled.p`
	font-size: ${fonts.regular};
	color: ${colors.gray};
	font-weight: 400;
	padding-left: ${metrics.defaultPadding};
`

export const AlertText = styled.p`
	padding-left: ${metrics.defaultPadding};
	color: ${colors.warningYellow};
	font-weight: 600;
`

export const ReasonTitle = styled.span`
	font-size: ${fonts.xxxLarge};
	font-weight: 500;

	@media (max-width: 768px) {
      font-size: ${fonts.xxLarge};
  	}
`

export const FormTitle = styled.span`
	font-size: ${fonts.medium};
`