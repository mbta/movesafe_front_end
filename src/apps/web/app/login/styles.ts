import { colors, metrics } from '@repo/themes';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
	width: ${metrics.fullscreen};
  height: ${metrics.fullscreen};
  flex-direction: column;
  align-items: center;
  justify-content: center;
	box-shadow: none;
	position: absolute;
  background-color: ${colors.primaryBlue};
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 28%;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.xLargePadding};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${metrics.largePadding};
`;

export const AppTitle = styled.span`
  margin-top: 1em;
  font-weight: 500;
  font-size: 32px;
  color: ${colors.white}
`;