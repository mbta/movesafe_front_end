import styled from "styled-components";
import { metrics, colors, fonts } from "@repo/themes";

export const Overlay = styled.div<{ show: boolean }>`
	display: ${({ show }) => (show ? "flex" : "none")};
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
	background-color: ${colors.white};
	padding-top: ${metrics.defaultPadding};
	border-radius: ${metrics.borderRadiusDouble};
	width: ${metrics.modalWidth};
	display: flex;
	flex-direction: column;
	align-items: center;
	pointer-events: auto;
	@media (min-width: 1100px) {
		width: 30%;
	}
`;

export const CloseButtonContainer = styled.div`
	cursor: pointer;
`;

export const TitleContainer = styled.div`
	width: ${metrics.modalContentWidth};
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
	& > * {
		margin-top: ${metrics.defaultPadding};
		margin-bottom: ${metrics.largePadding};
	}
`

export const TextContainer = styled.div`
	width: ${metrics.modalContentWidth};
	font-size: ${fonts.xLarge};
	font-weight: 400;
	@media (min-width: 1100px) {
		font-size: ${fonts.xxLarge};
	}
`

export const ButtonContainer = styled.div`
	width: 90%;
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	& > * {
		margin-top: ${metrics.largePadding};
		margin-left: ${metrics.defaultPadding};
		margin-bottom: ${metrics.largePadding};
	}
`;