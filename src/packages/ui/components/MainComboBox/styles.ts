import styled from "styled-components";
import { colors } from "@repo/themes";

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

export const ComboBoxTitle = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.black};
`;

export const Container = styled.div`
  width: 100%;
  height: 40px;
`;
