import styled from "styled-components";
import { metrics, fonts, colors } from '@repo/themes';
import { StyleSheet } from "@react-pdf/renderer";

export const RowContainer = styled.div`
	width: ${metrics.fullscreen};
	display: flex;
	flex-direction: row;
	margin-bottom: 0.5em;
`;

export const SummaryContainer = styled.div`
	width: ${metrics.modalWidth};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	@media (min-width: 768px) {
    	width: 80%;
  	}
`;

export const ButtonsContainer = styled.div`
	height: ${metrics.xxLargePadding};
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	gap: 1em;
	padding-top: 1em;
	flex-wrap: wrap;
	@media (min-width: 768px) {
    	width: 20%;
  	}
`;

export const SummaryItem = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1em;
	align-items: flex-start;
`;

export const SummaryItemLabel = styled.div`
color: ${colors.gray};
	font-size: ${fonts.xSmall};
`;

export const SummaryItemContent = styled.div`
	font-size:  ${fonts.medium};
`;

export const TrainNumberLabel = styled.div`
	font-size:  ${fonts.medium};
	align-self: center;
	padding: 1em;
`;

export const PDFLinkStyle = StyleSheet.create({
	a: {
		textDecoration: "none"
	}
});