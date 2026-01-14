import styled from "styled-components";
import { metrics, colors, fonts } from "@repo/themes";

export const Overlay = styled.div<{ show: boolean }>`
	display: ${({ show }) => (show ? "flex" : "none")};
	position: fixed;
	top: 0;
	left: 0;
	width: ${metrics.fullscreen};
	height: ${metrics.fullscreen};
	background-color: rgba(0, 0, 0, 0.5);
	justify-content: center;
	align-items: center;
	z-index: 1;
	pointer-events: none;
`;

export const ModalContent = styled.div`
	background-color: white;
	display: flex;
	text-align: left;
	flex-direction: column;
	pointer-events: auto;
	max-height: ${metrics.informationModalHeight};
	min-height: ${metrics.informationModalHeight};
	padding: ${metrics.largePadding};
	border-radius: ${metrics.borderRadiusDouble};
	width: ${metrics.informationModalWidth};

	@media (max-width: 1100px) {
		width: ${metrics.modalWidth};
	}
`;

export const CloseButtonContainer = styled.div`
	cursor: pointer;
`;

export const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: top;
`;

export const TextContainer = styled.div`
	font-size: ${fonts.xLarge};
	font-weight: bold;
	@media (min-width: 1100px) {
		font-size: ${fonts.xxLarge};
	}
`;

export const ContentContainer = styled.div`
	display: flex;
	margin-bottom: ${metrics.defaultPadding};
	overflow-y: auto;
	overflow-x: hidden;
`;

export const Spacer = styled.div`
	height: 1px;
	background-color: ${colors.primaryBlue};
	margin-bottom: ${metrics.defaultPadding};
`;