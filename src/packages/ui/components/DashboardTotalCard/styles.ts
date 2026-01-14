import styled from "styled-components";
import { colors, fonts, metrics } from "@repo/themes";

export const Container = styled.div`
  height: 120px;
  width: 380px;
  border: 2px solid ${colors.softGray};
  border-radius: ${metrics.borderRadius};
  background-color: ${colors.white};
  padding: 0px 10px 5px 15px ;
  margin-right: 2%;
`;

export const Title = styled.p`
  color: ${colors.gray};
  font-size: ${fonts.small};
  font-weight: 500;
`;

export const DivRail = styled.div`
  height: 55px;
  width: ${metrics.fullscreen};
  display: flex;
  justify-content: space-between;
`;
