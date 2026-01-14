import { colors, fonts, metrics } from "@repo/themes";
import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin: 1em 0.5em 1em 0.5em;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const ExpandIcon = styled.div`
  font-size: 28px;
  color: #0056b3;
`;

export const ItemsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  padding: 8px;
  background-color: #f8f9fa;
`;

export const ItemText = styled.p`
  font-size: ${fonts.xxLarge};
  color: ${colors.primaryBlue};
  font-weight: bold;
  margin-top: 15px;
`;

export const CollapseContainer = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  gap: ${metrics.defaultPadding};
  align-items: center;
`;

export const RemoveIcon = styled.div`
  font-size: 16px;
  color: #d9534f;
  cursor: pointer;
  &:hover {
    color: #c9302c;
  }
`;
