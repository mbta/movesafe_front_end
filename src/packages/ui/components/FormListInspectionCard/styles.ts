import styled, {css} from 'styled-components';
import { colors, fonts, metrics } from '@repo/themes';

interface FormNameProps {
	isFilled: boolean;
}

export const Container = styled.div`
	display: flex; 
	gap: ${metrics.defaultPadding}; 
	font-size: ${fonts.medium};
	margin-left: ${metrics.defaultPadding}
`;

export const FormName = styled.span<FormNameProps>`
	${props => props.isFilled
		? css `color: ${colors.kellyGreen}`
		: css `color: ${colors.gray}`
	}
`;
