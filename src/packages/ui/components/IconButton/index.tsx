"use client";
import React, { MouseEvent } from "react";
import { Button } from "./styles";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  icon?: any;
  primary?: boolean;
  noBorder?: boolean;
}

const IconButton: React.FC<ButtonProps> = ({
  onClick,
  icon,
  primary = true,
  noBorder = false,
}) => {
  return (
    <Button onClick={onClick} primary={primary} noBorder={noBorder}>
      {icon}
    </Button>
  );
};

export default IconButton;
