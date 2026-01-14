import React, { MouseEvent } from "react";
import { Button, TextButton } from "./styles";
import { ComponentSizes } from "@repo/constants/constants";
import { colors } from "@repo/themes";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  text: string;
  primary?: boolean;
  size?: string;
  disabled?: boolean;
  hasIcon?: boolean;
  icon?: any;
  color?: string;
  invertedColors?: boolean;
}

const MainButton: React.FC<ButtonProps> = ({
  onClick,
  text,
  primary = true,
  size = ComponentSizes.small,
  disabled = false,
  hasIcon = false,
  icon = null,
  color = colors.primaryBlue,
  invertedColors = false
}) => {
  return (
    <Button
      onClick={onClick}
      $primary={primary}
      $size={size}
      $disabled={disabled}
      $color={color}
      disabled={disabled}
      $invertedColors={invertedColors}
    >
      {hasIcon && icon}
      <TextButton $size={size}>{text}</TextButton>
    </Button>
  );
};

export default MainButton;
