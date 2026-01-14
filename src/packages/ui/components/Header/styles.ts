import styled from "styled-components";
import { colors, metrics } from "@repo/themes";

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${colors.darkBlue};
  padding: 10px 10px 5px 10px;
  height: ${metrics.headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -8px;
  @media (max-width: 768px) {
    padding: 0 1em;
    height: 70px;
  }
`;

export const Logo = styled.img`
  height: ${metrics.logoHeaderSize};
  width: ${metrics.logoHeaderSize};
  margin-right: 10px;
`;

export const UserImg = styled.img`
  height: ${metrics.iconSize};
  width: ${metrics.iconSize};
  margin-right: 7px;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.white};
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
`;

export const LeftView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RightView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80%;
  gap: 15px;
  @media (max-width: 768px) {
    height: 80%;
  }
`;

export const InfoView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  height: 80%;
  gap: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const InfoText = styled.p`
  color: ${colors.white};
  font-size: 14px;
`;

export const InfoViewMobile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  height: 80%;
  margin-right: ${metrics.largePadding};
`;
