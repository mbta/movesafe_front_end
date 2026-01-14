import styled from "styled-components";
import { colors, fonts, metrics } from "@repo/themes";

export const ListContainer = styled.div`
  width: 100%;
  margin-top: -10px;
`;

export const List = styled.table`
  width: 100%;
  overflow-x: auto;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? colors.primaryBlue : colors.softGray};
  color: ${colors.white};
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: ${metrics.borderRadius};
  &:hover {
    background-color: ${colors.darkBlue};
  }
`;

export const HeaderRow = styled.tr`
`;

export const HeaderItem = styled.th`
  text-align: left;
  font-size: ${fonts.xSmall};
  color: ${colors.darkGray};
  font-weight: 500;
  border-bottom: 1px solid ${colors.softGray};
  padding-bottom: 10px;
  width: 100px;
`;
