import styled from 'styled-components';
import { metrics, colors, fonts } from "@repo/themes";

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const TextLabel = styled.p`
	font-size: ${fonts.regular};
	color: ${colors.gray};
	font-weight: 400;
	padding-right: ${metrics.defaultPadding};
`;

export const PriorityContainer = styled.div`
	display: inline-block;
	background-color: ${colors.lightGray};
	padding-left: ${metrics.defaultPadding};
	border-radius: ${metrics.largeBorderRadius};
`;

export const PriorityText = styled.p`
	font-size: ${fonts.medium};
	color: ${colors.black};
	font-weight: 400;
`;