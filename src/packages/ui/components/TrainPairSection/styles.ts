import styled from "styled-components";

interface SelectProps {
  $isMobile?: boolean;
}

export const PairViewComboBox = styled.div<SelectProps>`
  display: flex;
  margin-right: 20px;
  min-width: 82px;
  height: 120px;
  flex-direction: column;
  gap: 8px;
`;

export const DestinationView = styled.div<SelectProps>`
  display: flex;
  margin-right: 25px;
  width: 60%;
  height: 120px;
  flex-direction: column;
  gap: 8px;
`;

export const ViewPair = styled.div<{ title?: string; $isMobile?: boolean }>`
  width: 100%;
  display: block;
`;

export const InputView = styled.div<SelectProps>`
  width: 100%;
  margin-right: 25px;
`;

export const DeleteView = styled.div<SelectProps>`
  margin-top: 20px;
  margin-left: -5px;
`;

export const OrderView = styled.div<SelectProps>`
  width: 35px;
  margin-right: 40px;
`;
