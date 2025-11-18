import styled from "styled-components";
import { metrics, fonts, colors } from '@repo/themes';

export const Overlay = styled.div<{ show: boolean }>`
	display: ${props => (props.show ? 'flex' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	width: ${metrics.fullscreen};
	height: ${metrics.fullscreen};
	background-color: rgba(0, 0, 0, 0.8);
	justify-content: center;
	align-items: center;
	z-index: 1000;
	pointer-events: none;
`;

export const ModalContent = styled.div`
	background-color: white;
	padding: ${metrics.largePadding};
	border-radius: ${metrics.borderRadiusDouble};
	text-align: center;
	width: ${metrics.modalWidth};
	display: flex;
	flex-direction: column;
	align-items: center;
	pointer-events: auto;
`;

export const TitleContainer = styled.div`
	display: flex;
	width: ${metrics.fullscreen};
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const ContentContainer = styled.div`
	display: flex;
	width: ${metrics.fullscreen};
	flex-direction: column;
	justify-content: center;
	margin-bottom: ${metrics.largePadding};
	margin-top: ${metrics.smallMargin};
	gap: ${metrics.defaultPadding};
`;

export const Separator = styled.div`
	height: 2px;
	width: ${metrics.fullscreen};
	background-color: ${colors.softGray};
`


export const Image = styled.img`
	width: ${metrics.modalWidth};
	border-radius: ${metrics.borderRadiusDouble};
`;

export const ModalTitle = styled.p`
	font-size: ${fonts.xxLarge};
	margin: ${metrics.defaultPadding};
`;

export const CongratsText = styled.p`
	font-size:  ${fonts.xLarge};
	margin: ${metrics.defaultPadding} 0;
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

`

export const DateTimeText = styled.p`
	font-size: ${fonts.medium};
	color: ${colors.gray};
	font-weight: 400;
	padding-right: ${metrics.defaultPadding};
`

export const AlertText = styled.p`
	padding-left: ${metrics.defaultPadding};
	color: ${colors.warningYellow};
	font-weight: 600;
`

export const ReasonTitle = styled.span`
	font-size: ${fonts.xxxLarge};
	align-self: flex-start;
	font-weight: 500;
`

export const FormTitle = styled.span`
	font-size: ${fonts.medium};
`