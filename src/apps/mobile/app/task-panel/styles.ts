import styled from 'styled-components';
import { fonts, metrics } from '@repo/themes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${metrics.fullscreen};
  height: ${metrics.fullscreen};
  position: absolute;
`

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-left: ${metrics.largePadding};
  padding-right: ${metrics.largePadding};
`;

export const CurrentTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${metrics.largePadding};
  padding-right: ${metrics.largePadding};
`;

export const TabContainer = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: ${metrics.largePadding};
`;

export const Title = styled.span`
  font-family: sans-serif;
  font-size: ${fonts.xxxLarge};
`;