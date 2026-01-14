import { colors } from "@repo/themes";
import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  from { transform: rotate(0turn); }
  to { transform: rotate(1turn); }
`;

export const LoaderWrapper = styled.div<{ hidden: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(148, 163, 184, 0.75);
  transition: opacity 0.75s, visibility 0.75s;
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};

  &::after {
    content: "";
    width: 75px;
    height: 75px;
    border: 15px solid ${colors.white};
    border-top-color: ${colors.primaryBlue};
    border-radius: 50%;
    animation: ${loadingAnimation} 0.75s ease infinite;
  }
`;