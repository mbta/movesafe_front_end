import styled from 'styled-components';
import { colors, fonts } from "@repo/themes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 33em;
  background-color: ${colors.paleBlueGray};
  border-radius: 8px;
  padding: 16px;
  margin-top: 2em;
  margin-bottom: 2em;
  overflow: hidden;

  @media (max-width: 1100px) {
    width: 95%;
  }
`;

export const IconColumn = styled.div`
  flex: 0 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoColumn = styled.div`
  flex: 1;
  padding: 0 8px;
`;

export const ButtonColumn = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.div`
  display: flex;
  font-size: ${fonts.xLarge};
`;

export const BadgeAndName = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.1em;
`;

export const Badge = styled.div`
  font-size: ${fonts.regular};
  color: ${colors.gray};
`;

export const Name = styled.div`
  font-size: ${fonts.regular};
  color: ${colors.black};
  margin-left: 0.4em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Button = styled.button`
  background-color: #00796b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;;

  &:hover {
    background-color: #004d40;
  }
`;

export const IconButton = styled(Button)`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LargeComboBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100px;
  margin-right: 20px;

  @media (max-width: 768px) {
    height: 5em;
  }
`;