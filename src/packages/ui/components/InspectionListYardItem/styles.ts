import styled from "styled-components";
import { colors, fonts } from "@repo/themes";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 120%;
  border-bottom: 1px solid ${colors.softGray};
  height: 60px;
  min-width: 1200px;
  position: relative;
`;

export const InfoContainer = styled.div`
  margin-right: 0px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80px;
`;

export const TimeContainer = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 220px;
`;
export const InfoTrainNumber = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0px;
  width: 100px;
  justify-content: center;
`;

export const InfoReasonMove = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
  width: 150px;
  justify-content: center;
`;

export const InfoYardmaster = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 150px;
  justify-content: center;
`;

export const InfoBadge = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  width: 80px;
  justify-content: center;
`;

export const InfoTitle = styled.p`
  font-size: ${fonts.xSmall};
  color: ${colors.gray};
  margin: 0;
`;

export const InfoData = styled.p`
  font-size: ${fonts.small};
  color: ${colors.black};
  margin: 0;
`;

export const StatusBackground = styled.div<{ background: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  background-color: ${({ background }) => background};
  border-radius: 50px;
  padding: 0px 15px;
`;

export const StatusContainer = styled.div`
  width: 180px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: sticky;
  top: 0;
  right: 0px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    ${colors.offWhite} 10%
  );
  padding-left: 20px;
`;

export const InfoStatus = styled.p<{ color: string }>`
  font-size: ${fonts.small};
  color: ${({ color }) => color};
  font-weight: 500;
`;

export const IconButtonContainer = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  right: 10px;
  background-color: ${colors.offWhite};
`;

export const LineLocationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0px;
  width: 200px;
`;

export const LineCircle = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-weight: bold;
  font-size: ${fonts.xSmall};
`;

export const LocationText = styled.span`
  margin-left: 10px;
  color: ${colors.darkGray};
  font-size: ${fonts.small};
`;
