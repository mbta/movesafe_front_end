import styled from "styled-components";
import { colors, fonts } from "@repo/themes";

export const Title = styled.span`
  color: ${colors.gray};
  font-size: ${fonts.regular};
  font-weight: 500;
`;

export const Container = styled.div`
  height: 70px;
  width: 45%;
  display: flex;
  align-items: center;
`;

export const DivInspection = styled.div`
  width: 100px;
  padding-left: 5px;
`;

export const BigNumber = styled.p`
  color: ${colors.black};
  font-size: ${fonts.xxLarge};
  font-weight: bold;
  margin-bottom: 0px;
`;

export const SmallNumber = styled.p`
  color: ${colors.black};
  font-size: ${fonts.xSmall};
  font-weight: bold;
  margin-bottom: 4%;
`;

export const DivNumber = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 40px;
`;

export const Bar = styled.p`
  color: ${colors.black};
  font-size: ${fonts.xSmall};
  font-weight: bold;
  margin-bottom: 4%;
`;
