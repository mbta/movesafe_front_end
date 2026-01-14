"use client";
import React, { ReactNode, useState } from "react";
import { TooltipContainer, TooltipText } from "./styles";

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom" | "right" | "left";
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = "bottom" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <TooltipContainer onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <TooltipText isVisible={isVisible} position={position}>
        {text.split("\n").map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
