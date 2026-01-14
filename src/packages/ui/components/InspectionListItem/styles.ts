import styled from "styled-components";
import { colors, fonts } from "@repo/themes";

export const Container = styled.tr`
`;

export const InfoContainer = styled.td`
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
  width: 4%;
`;

export const TimeContainer = styled.td`
  width: 9%;
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
`;
export const InfoTrainNumber = styled.td`
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
  width: 22%;
`;

export const InfoReasonMove = styled.td`
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
  width: 11%;
`;

export const InfoYardmaster = styled.td`
  width: 6%;
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const InfoBadge = styled.td`
  width: 7%;
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
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
  border: 1px solid ${colors.lightSilver};
  margin-right: 1.5em;

  @media (max-width: 1800px) {
    height: 3em;
  }

  @media (max-width: 1500px) {
    height: 4em;
  }
`;

export const StatusContainer = styled.td`
  width: 11%;
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const InfoStatus = styled.p<{ color: string }>`
  font-size: ${fonts.small};
  color: ${({ color }) => color};
  text-align: center;
  font-weight: 500;

  @media (max-width: 1800px) {
    font-size: ${fonts.xSmall};
  }
`;

export const IconButtonContainer = styled.td`
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
  width: 3%;
`;

export const LineLocationContainer = styled.td`
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  padding-top: 10px;
  width: 11%;
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

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TrainNumbersContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2em;
`;

export const TrainPairContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 6em;
`;

export const Badge = styled.div`
	width: 1.1em;
	height: 1.1em;
	border-radius: 50%;
	background-color: ${colors.mustard};
	color: ${colors.white};
	text-align: center;
	margin-left: -0.6em;
  margin-top: -0.8em;
	padding: 0.1em;
	font-size: ${fonts.xSmall};
`;