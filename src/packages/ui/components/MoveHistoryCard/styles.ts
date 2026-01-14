import styled from 'styled-components';
import colors from '@repo/themes/colors';
import metrics from '@repo/themes/metrics';
import fonts from '@repo/themes/fonts';

export const CardContainer = styled.div`
	border: 1px solid ${colors.blueGray};
	border-radius: ${metrics.borderRadius};
	background-color: ${colors.paleBlueGray};
	padding: ${metrics.defaultPadding};
	margin-bottom: ${metrics.largePadding};
	display: flex;
	flex-direction: column;
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

export const DateTimeText = styled.p`
	font-size: ${fonts.large};
	color: ${colors.gray};
	font-weight: 400;
	padding-right: ${metrics.defaultPadding};
`

export const StatusText = styled.p`
	font-size: ${fonts.large};
	color: ${props => props.color || colors.gray};
	font-weight: 400;
	padding-right: ${metrics.defaultPadding};
`

export const ReasonTitle = styled.span`
	font-size: ${fonts.xxxLarge};
	font-weight: 500;
	margin-bottom: ${metrics.largePadding};
`

export const InspectionFailedText = styled.span`
	font-size: ${fonts.large};
	color: ${colors.red};
	font-weight: 400;
`

export const FailedVehicleContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${metrics.smallMargin};
	padding: ${metrics.defaultPadding} ${metrics.defaultPadding} 0px 0px;
`;