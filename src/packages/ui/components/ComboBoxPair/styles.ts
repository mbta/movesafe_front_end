import styled from "styled-components";
import { colors, fonts } from "@repo/themes";

export const PairContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-right: 50px;
`;

export const PairTitle = styled.div`
  font-size: ${fonts.medium};
  color: ${colors.darkGray};
  margin-bottom: 10px;
`;

export const SmallComboBoxContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const DefaultComboBox = styled.select`
  height: 40px;
  width: 100%;
  color: ${colors.black};
  background-color: ${colors.offWhite};
  border-radius: 4px;
  border: 1px solid ${colors.primaryBlue};
  padding-right: 30px;
  padding-left: 10px;
`;

export const Container = styled.div`
  width: 100%;
  height: 40px;
`;
