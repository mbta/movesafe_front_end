import styled from 'styled-components';
import { colors, fonts, metrics } from '@repo/themes';

export const CardContainer = styled.div`
  border: 1px solid ${colors.blueGray};
  border-radius: ${metrics.defaultPadding};
  background-color: ${colors.paleBlueGray};
  padding: ${metrics.largePadding};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardText = styled.span`
  padding-top: ${metrics.largePadding};
  font-family: sans-serif;
  font-size: ${fonts.large};
  color: ${colors.blueGray};
`;

export const CardImg = styled.img`
  height: ${metrics.logoSize};
  width: ${metrics.logoSize};
  margin: ${metrics.defaultPadding} 0px ${metrics.defaultPadding} 0px;
`;