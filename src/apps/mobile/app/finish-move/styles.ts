
import styled from 'styled-components';
import { colors, fonts, metrics } from '@repo/themes';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: ${metrics.fullscreen};
	padding: 0px 20px 0px 20px ;
	background-color: #fff;
	font-family: Arial, sans-serif;
	box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-left: 8px;
`;

export const TaskTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${metrics.defaultPadding};
  height: ${metrics.xLargePadding};
`;

export const FromRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${metrics.defaultPadding};
`;

export const FromText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export const LocationText = styled.span`
  font-size: 16px;
  margin: 0 4px;
`;

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${metrics.xLargePadding};
  gap: ${metrics.largePadding};
`;

export const OrderText = styled.span`
  color: ${colors.gray};
  font-size: ${fonts.xLarge};
  padding-right: ${metrics.smallPadding};
`;