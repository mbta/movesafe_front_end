import { colors, fonts, metrics } from "@repo/themes";
import styled from "styled-components";

export const TitleView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${metrics.smallPadding};
`;

export const ModalTitle = styled.span`
  font-size: ${fonts.large};
  font-weight: 500;
  color: ${colors.black};
`;

export const CloseBtnContainer = styled.div`
  width: fit-content;
  height: fit-content;
  cursor: pointer;
`;