import styled from "styled-components";
import { colors, metrics, fonts } from "@repo/themes";

export const Container = styled.div`
  height: 120px;
  width: fit-content;
  border: 2px solid ${colors.softGray};
  border-radius: ${metrics.borderRadius};
  background-color: ${colors.white};
  padding: 0px 40px 5px 15px ;
`;

export const Title = styled.p`
  color: ${colors.gray};
  font-size: ${fonts.small};
  font-weight: 500;
  margin-bottom: 10px;
`;

export const DivRail = styled.div`
  height: 55px;
  width: ${metrics.fullscreen};
  display: flex;
  justify-content: space-between;
`;

export const RailInfo = styled.div`
  width: ${metrics.fullscreen};
  display: flex;
`;

export const TotalInspection = styled.div`
  width: 10%;
`;

export const Checklist = styled.div`
  width: 50%;
`;

export const InspectionList = styled.div`
  width: ${metrics.fullscreen};
  display: flex;
  margin-top: 13px;
`;

export const BigNumber = styled.span`
  color: ${colors.black};
  font-size: ${fonts.xLarge};
  font-weight: bold;
`;

export const Bar = styled.div`
  background-color: ${colors.lightSilver};
  height: ${metrics.fullscreen};
  width: 0.5px;
  margin: 15px 30px 5px 30px;
`;
