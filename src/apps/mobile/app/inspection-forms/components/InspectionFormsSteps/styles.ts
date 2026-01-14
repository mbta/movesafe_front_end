import { colors } from "@repo/themes";
import styled, { css } from "styled-components";

interface StyleProps {
  $isActive: boolean;
  $isComplete: boolean;
}

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const Container = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10em;
  height: 2em;
  padding: 1em;
  margin: 0.5em;

  ${(props) =>
    props.$isActive &&
    css`
      background-color: ${colors.white};
    `}

    ${(props) =>
    props.$isComplete &&
    css`
      background-color: ${colors.pastelBlue};
    `}

  @media (max-width: 768px) {
    width: 6em;
  }
`;

export const Number = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8em;
  min-width: 1.8em;
  height: 1.8em;
  border-radius: 50%;
  background-color: ${colors.lightSilver};
  color: ${colors.white};

  ${(props) =>
    props.$isActive &&
    css`
          background-color: ${colors.darkBlue};
    `}

  ${(props) =>
    props.$isComplete &&
    css`
          background-color: ${colors.skyBlue};
          color: ${colors.darkBlue};
    `}
`;

export const Title = styled.div<StyleProps>`
  display: flex;
  margin-left: 0.5em;
  color: ${colors.lightSilver};
  font-size: 1.1em;

  ${(props) =>
    props.$isActive &&
    css`
          color: ${colors.darkBlue};
    `}

  ${(props) =>
    props.$isComplete &&
    css`
          color: ${colors.darkBlue};
    `}

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;