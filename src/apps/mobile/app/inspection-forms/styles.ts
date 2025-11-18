import { colors } from '@repo/themes';
import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  margin-left: 1.8em;
`;

export const IconContainer = styled.div`
  margin-right: 1em;
`;

export const InspectionContainer = styled.div`
  border: 0.15em solid ${colors.softGray};
  width: 90%;
  border-radius: 1em;
  padding: 1em;
  margin-bottom: 1em;
`;