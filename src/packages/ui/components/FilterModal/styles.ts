import styled from "styled-components";
import { colors, metrics } from "@repo/themes";

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

export const ModalContent = styled.div`
  background-color: ${colors.white};
  padding: ${metrics.largePadding};
  border-radius: ${metrics.borderRadius};
  width: min-content;
  height: fit-content;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const SmallContentContainer = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	padding: ${metrics.smallPadding};
	gap: ${metrics.largePadding};
	justify-content: stretch;
`;

export const InputContentContainer = styled(SmallContentContainer)`
  width: 92%;
	gap: ${metrics.xxLargePadding};
`;

export const LargeContentContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: ${metrics.smallPadding};
`;

export const CloseButton = styled.div`
  cursor: pointer;
`;

export const TitleView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonView = styled.div`
	display: flex;
  width: auto;
	flex-direction: row;
  justify-content: flex-end;
	gap: ${metrics.defaultPadding};
  margin-top: ${metrics.defaultPadding};
`;

export const ComboBoxContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const SmallComboBox = styled.div`
  width: 120px;
  height: 100px;
  margin-right: 10px;
`;

export const LargeComboBox = styled.div`
  width: 200px;
  height: 100px;
  margin-right: 50px;
`;
