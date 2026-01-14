import styled from "styled-components";
import { colors, metrics } from "@repo/themes";

interface TooltipTextProps {
  isVisible: boolean;
  position: "top" | "bottom" | "right" | "left";
}

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
	margin-right: ${metrics.defaultPadding};
	margin-top: ${metrics.smallMargin};
  cursor: pointer;
`;

export const TooltipText = styled.div<{
  isVisible: boolean;
  position: "top" | "bottom" | "right" | "left";
}>`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  background-color: ${colors.darkGray};
  color: ${colors.white};
  text-align: left;
  border-radius: ${metrics.smallMargin};
  padding: 16px;
  position: absolute;
  z-index: 1;
  width: max-content;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s;
  max-width: 30ch;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  ${({ position }) => {
    switch (position) {
      case "top":
        return `
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: ${metrics.defaultPadding};

          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: ${metrics.smallMargin};
            border-style: solid;
            border-color: ${colors.darkGray} transparent transparent transparent;
          }
        `;
      case "bottom":
        return `
          top: 125%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: ${metrics.defaultPadding};

          &::after {
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-width: ${metrics.smallMargin};
            border-style: solid;
            border-color: transparent transparent ${colors.darkGray} transparent;
          }
        `;
      case "right":
        return `
          top: 50%;
          left: 125%;
          transform: translateY(-50%);
          margin-left: ${metrics.defaultPadding};

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: -10px;
            transform: translateY(-50%);
            border-width: ${metrics.smallMargin};
            border-style: solid;
            border-color: transparent ${colors.darkGray} transparent transparent;
          }
        `;
      case "left":
        return `
          top: 50%;
          right: 125%;
          transform: translateY(-50%);
          margin-right: ${metrics.defaultPadding};

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -10px;
            transform: translateY(-50%);
            border-width: ${metrics.smallMargin};
            border-style: solid;
            border-color: transparent transparent transparent ${colors.darkGray};
          }
        `;
      default:
        return "";
    }
  }}
`;
