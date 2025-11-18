import styled from 'styled-components';
import { metrics, colors, fonts } from "@repo/themes";

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const TrainUnitContainer = styled.div<{ index: number }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: ${({ index }) => (index % 2 === 0 ? '5px 5px 5px 10px' : '5px 15px 5px 5px')};
`;

export const TrainContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const Button = styled.button<{ selected: boolean, isSmall?: boolean }>`
	width: 6em;
  height: 6em;
	border: ${metrics.borderWidth} solid ${colors.softGray};
	border-radius: ${metrics.borderRadius};
	cursor: pointer;
	padding: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ selected }) => (selected ? colors.red : colors.softWhiteBlue)};

	@media (max-width: 768px) {
      width: ${(props) => props.isSmall ? '5em' : '6em'};
      height: ${(props) => props.isSmall ? '5em' : '6em'};
  	}
`;

export const Icon = styled.img`
	width: ${metrics.iconSize};
	height: ${metrics.iconSize};
`;

export const CarNumberText = styled.div`
	font-family: sans-serif;
	font-size: ${fonts.xLarge};
	color: ${colors.gray};
	font-weight: 200;

	@media (max-width: 768px) {
      font-size: ${fonts.regular};
  	}
`;

export const CarOrderIndicator = styled.p`
	font-family: sans-serif;
	font-size: ${fonts.xLarge};
	color: ${colors.gray};
	display: flex;
	align-self: flex-end;
	margin-bottom: 1.5em;
`;

export const SupText = styled.sup`
	font-size: 12px;
	vertical-align: middle;
`;