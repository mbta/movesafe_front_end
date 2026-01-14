import { colors, fonts, metrics } from '@repo/themes';
import styled from 'styled-components';

export const CommentContainer = styled.div`
padding-left: ${metrics.defaultPadding};
padding-right: ${metrics.mediumPadding};
	margin-top: ${metrics.largePadding};
`;

export const CommentTitleContainer = styled.div`
	display: flex;
	gap: ${metrics.smallMargin};
`;

export const CommentTitleContentContainer = styled.div`
	display: flex;
	align-items: center;
	gap: ${metrics.defaultPadding};
	margin-bottom: 5px;
`;

export const CommentTitle = styled.span`
	color: ${colors.black};
	font-size: ${fonts.medium};
	font-weight: bold;
`;

export const CommentMark = styled.span`
	color: ${colors.red};
	font-size: ${fonts.regular};
	font-weight: bold;
`;