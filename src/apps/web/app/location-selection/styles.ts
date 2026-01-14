import { metrics } from '@repo/themes';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
	padding: 50px;
  flex-direction: column;
  align-items: center;
`;

export const SelectionContainer = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: ${metrics.fullscreen};
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.largePadding};
`;