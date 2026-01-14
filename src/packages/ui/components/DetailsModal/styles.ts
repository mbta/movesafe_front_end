import styled from "styled-components";
import { metrics, fonts, colors } from '@repo/themes';

export const Overlay = styled.div`
	display: flex;
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
	max-height: 80%;
	min-height: 80%;
	padding: ${metrics.defaultPadding};
	border-radius: ${metrics.borderRadiusDouble};
	text-align: center;
	width: ${metrics.modalWidth};
	display: flex;
	flex-direction: column;
	align-items: center;
	pointer-events: auto;
	overflow-y: auto;
	overflow-x: hidden;
`;

export const TitleContainer = styled.div`
	width: ${metrics.fullscreen};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${colors.softGray};
	margin-left: 10px;
	padding: 0.4em;
`;

export const Title = styled.p`
	font-size: ${fonts.xxLarge};
	margin: ${metrics.defaultPadding};
`;