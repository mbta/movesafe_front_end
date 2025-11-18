import { colors } from "@repo/themes";
import styled from "styled-components";

export const SectionName = styled.div`
  color: ${colors.gray};
  font-size: 1.6em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  margin-left: 0.2em;
`;

export const LoadingContainer = styled.div`
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2em;
`;

export const RedAsterisk = styled.span`
  color: ${colors.red};
`;