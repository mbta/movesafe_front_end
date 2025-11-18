import styled from "styled-components";
import { colors, fonts, metrics } from "@repo/themes";

export const DashboardContainer = styled.div`
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
  margin-bottom: ${metrics.largePadding};
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.2em;
`;

export const ViewDate = styled.div`
  display: flex;
  height: 100%;
  width: 190px;
  align-items: center;
  margin-right: 0.8em;
`;

export const ViewInspectionCards = styled.div`
  display: flex;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
  padding-right: 0%;
`;

export const ViewInspectionList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 97.5%;
  margin-bottom: 50px;
  padding: 10px 20px 20px 20px ;
  border: 1px solid ${colors.softGray};
  border-radius: ${metrics.borderRadius};
  background-color: ${colors.white};
`;

export const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
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

export const ViewCreateButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

export const ViewCreateMove = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 300px;
  margin-bottom: 70px;
`;

export const CreateText = styled.p`
  font-size: 16px;
  font-family: sans-serif;
  color: ${colors.gray};
`;

export const YardTitle = styled.div`
  font-size: ${fonts.xxxLarge};
`;

export const MoveReasonsInfoContainer = styled.div`
  margin-bottom: ${metrics.defaultPadding};
`;

export const MoveReasonsInfoText = styled.span`
  font-size: ${fonts.medium};
`;