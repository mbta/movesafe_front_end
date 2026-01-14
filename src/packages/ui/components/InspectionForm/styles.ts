import styled from 'styled-components';
import { colors, fonts } from '@repo/themes';

export const Container = styled.div`
  width: 30%;
  display: flex;
  margin-right:10px;
`;

export const FormName = styled.span`
  color: ${colors.gray};
  font-size: ${fonts.regular};
  margin-right:10px;
`;

export const Quantity = styled.span`
  color: ${colors.black};
  font-size: ${fonts.regular};
  font-weight: 500;
`;
