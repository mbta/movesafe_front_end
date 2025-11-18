import styled from "styled-components";
import { metrics, colors, fonts } from "@repo/themes";

export const Overlay = styled.div<{ 'data-show': boolean }>`
	display: ${props => (props['data-show'] ? 'flex' : 'none')};
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
	padding: 0.2em;
	border-radius: ${metrics.borderRadiusDouble};
	width: ${metrics.halfWidth};
	display: flex;
	flex-direction: column;
	align-items: center;
	pointer-events: auto;
	@media (max-width: 1100px) {
    width: ${metrics.modalWidth};
  }
`;

export const SignatureContainer = styled.div`
	background-color: ${colors.white};
	border-radius: ${metrics.borderRadius};
	justify-content: center;
	width: 90%;
`;

export const TitleContainer = styled.div`
	width: 90%;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	align-items: center;
	& > * {
		margin-top: ${metrics.defaultPadding};
		margin-bottom: ${metrics.largePadding};
	}
`;

export const ClearContainer = styled.div`
	width: 90%;
	display: flex;
	margin-top: ${metrics.largePadding};
	margin-bottom: ${metrics.defaultPadding};
	justify-content: flex-end;
	align-items: center;
`;

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

export const SignatureLine = styled.div`
	margin-top: 2px;
	height: 2px;
	background-color: ${colors.primaryBlue};
`;

export const ClearButton = styled.text`
	cursor: pointer;
	color: ${colors.primaryBlue};
	font-weight: 500;
	font-size: ${fonts.large};
`;

export const IconColumn = styled.div`
  flex: 0 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoColumn = styled.div`
  flex: 1;
  padding: 0 16px;
`;

export const Label = styled.div`
  display: flex;
  font-size: ${fonts.xLarge};
`;

export const BadgeAndName = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.1em;
`;

export const Badge = styled.div`
  font-size: ${fonts.regular};
  color: ${colors.gray};
`;

export const Name = styled.div`
  font-size: ${fonts.regular};
  color: ${colors.black};
  margin-left: 0.4em;
`;