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
	padding: ${metrics.defaultPadding};
	border-radius: ${metrics.borderRadiusDouble};
	text-align: center;
	width: ${metrics.modalWidth};
	display: flex;
	flex-direction: column;
	align-items: center;
	pointer-events: auto;
`;

export const Image = styled.img`
	width: ${metrics.modalWidth};
	border-radius: ${metrics.borderRadiusDouble};
`;

export const CongratsTitle = styled.p`
	font-size: ${fonts.xxxLarge};
	margin: ${metrics.defaultPadding};
`;

export const CongratsText = styled.p`
	font-size:  ${fonts.xLarge};
	margin: ${metrics.defaultPadding} 0;
`;

export const WarningText = styled.span`
	font-size:  ${fonts.xLarge};
	color: ${colors.red};
`;

export const WarningContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: ${metrics.defaultPadding} 0 ${metrics.xLargePadding} 0;
	gap: ${metrics.smallPadding};
	align-items: center;
`;