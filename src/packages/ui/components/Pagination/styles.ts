import { colors, fonts, metrics } from "@repo/themes";
import styled from "styled-components";

interface PageButtonProps {
  active: boolean;
}

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})<PageButtonProps>`
  background-color: ${(props) =>
    props.active ? colors.primaryBlue : colors.softBlue};
  color: ${colors.white};
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: ${metrics.borderRadius};
  &:hover {
    background-color: ${colors.darkBlue};
  }
  @media (max-width: 1100px) {
    padding: 20px 25px;
    font-size: ${fonts.large};
  }
`;