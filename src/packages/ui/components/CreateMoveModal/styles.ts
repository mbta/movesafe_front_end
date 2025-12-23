import { colors, fonts, metrics } from "@repo/themes";
import styled, { css } from "styled-components";

interface SelectProps {
  $isMobile?: boolean;
}

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div<SelectProps>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: ${(props) => (props.$isMobile ? "70%" : "40%")};
  padding: 20px;
  border-radius: ${metrics.borderRadius};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 70%; /* When it reaches 80% of the screen height, activate the scroll */
  overflow-y: auto;

  @media (max-width: 1350px) {
    ${(props) =>
      !props.$isMobile &&
      css`
        width: 60%;
      `}
  }
`;

export const TitleView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${metrics.smallPadding};
`;

export const ButtonView = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftButtonContainer = styled.div`
  display: flex;
  margin-right: 10px;
`;

export const RightButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: ${metrics.defaultPadding};
`;

export const ComboBoxContainer = styled.div<SelectProps>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
`;

export const SmallComboBox = styled.div`
  width: 120px;
  height: 100px;
  margin-right: 10px;
`;

export const LargeComboBox = styled.div<SelectProps>`
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 100px;
  margin-right: 20px;

  ${(props) =>
    props.$isMobile &&
    css`
      width: 100%;
    `}
`;

export const LargeSelectInput = styled.div<SelectProps>`
  width: 50%;
  height: 100px;

  ${(props) =>
    props.$isMobile &&
    css`
      width: 100%;
    `}
`;

export const TrainView = styled.div<SelectProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputView = styled.div<SelectProps>`
  width: 120px;
  margin-right: 25px;

  ${(props) =>
    !props.$isMobile &&
    css`
      height: 50px;
    `}

  ${(props) =>
    props.$isMobile &&
    css`
      width: 100%;
    `}
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
