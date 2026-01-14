import styled from "styled-components";
import { colors, fonts, metrics } from "@repo/themes";

export const DashboardContainer = styled.div`
  height: 88%;
  width: 98%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ViewTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${metrics.defaultPadding};
  height: 50px;
  width: 100%;
`;

export const ViewDate = styled.div`
  display: flex;
  gap: 2em;
  height: 100%;
  align-items: center;
`;

export const ViewInspectionCards = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5em;
  margin-bottom: 1.5em;
  padding-right: 0%;
`;

export const ViewInspectionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;
  padding: 20px 25px 25px 25px ;
  margin-bottom: 20px;
  border: 1px solid ${colors.softGray};
  border-radius: ${metrics.borderRadius};
  background-color: ${colors.white};
`;

export const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SelectorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectorTitle = styled.h3`
  font-size: ${fonts.large};
  color: ${colors.darkGray};
  margin-bottom: 10px;
`;

export const NoMoveCardContainer = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 1em;
`;

export const CreateText = styled.p`
  font-size: 16px;
  font-family: sans-serif;
  color: ${colors.gray};
`;