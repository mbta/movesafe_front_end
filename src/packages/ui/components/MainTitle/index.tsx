"use client";
import React, { ReactNode } from "react";
import { Title, LabelTitle } from "./styles";

interface MainTitleProps {
  text: ReactNode;
  color?: string;
  $fontSettings?: "H1" | "H2" | "H3" | "H0";
  isLabel?: boolean;
}

const MainTitle: React.FC<MainTitleProps> = ({
  text,
  color = "black",
  $fontSettings,
  isLabel = false,
}) => {
  return (
    <>
      {isLabel ? (
        <LabelTitle style={{ color }} $fontSetting={$fontSettings}>
          {text}
        </LabelTitle>
      ) : (
        <Title style={{ color }} $fontSetting={$fontSettings}>
          {text}
        </Title>
      )}
    </>
  );
};

export default MainTitle;
