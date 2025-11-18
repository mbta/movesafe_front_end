import styled from 'styled-components';
import { colors, metrics, fonts } from '@repo/themes';

interface CardTextProps {
  renderSmall?: boolean;
}

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.blueGray};
  border-radius: ${metrics.borderRadius};
  background-color: ${colors.mysticGray};
  padding-left: ${metrics.defaultPadding};
  padding-right: ${metrics.defaultPadding};
`;

export const CardText = styled.p<CardTextProps>`
  font-family: sans-serif;
  font-size: ${fonts.large};
  color: ${colors.gray};
  margin: ${metrics.largePadding};

  @media (max-width: 768px) {
    font-size: ${(props) => props.renderSmall ? fonts.medium : fonts.large};
    margin: ${(props) => props.renderSmall ? '0.5em' : metrics.largePadding};
  }
`;

export const CardTextSeparator = styled.p`
  font-family: sans-serif;
  font-size: ${fonts.large};
  color: ${colors.blueGray};
`;

export const SupText = styled.sup`
	font-size: ${fonts.small};
	vertical-align: top;
`;
