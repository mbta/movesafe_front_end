import styled from "styled-components";
import { colors } from "@repo/themes";

export const Container = styled.div`
  margin: 0.2em;
`;

export const Title = styled.div`
  font-size: 1.8em;
  font-weight: 500;
  margin-top: 1em;
  margin-bottom: 0.5em;
`;

export const Description = styled.div`
  font-size: 1.4em;
  color: ${colors.gray};
`;

export const Bold = styled.span`
  color: ${colors.gray};
  font-weight: bold;
`;

export const CarInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1em;
  font-size: 1.4em;
  color: ${colors.gray};
  gap: 1.5em;
`;

export const Link = styled.span`
  color: ${colors.primaryBlue};
  font-weight: bold;
  text-decoration: underline;
  margin-left: 10px;
  cursor: pointer;
`;

export const ListTable = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  border: 1px solid black;
  padding: 0;
  margin: 0;
  margin-top: 0.5em;
`;

interface StyleLiProps {
  $index: number;
}

export const ListItem = styled.li<StyleLiProps>`
  list-style: none;
  padding: 8px;
  border-bottom: 1px solid black;
  text-align: left;
  background-color: ${({ $index }) => ($index % 2 === 0 ? "#f2f2f2" : "white")};

  &:last-child {
    border-bottom: none;
  }
`;