"use client";
import React, { ReactNode } from "react";
import { Container } from "./styles";
import { colors } from "@repo/themes";

interface MainContainerProps {
  children: ReactNode;
  color?: any;
  content?: string;
  hasHeader?: boolean;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  color = colors.offWhite,
  content = "flex-start",
  hasHeader = false,
}) => {
  return (
    <Container content={content} color={color} hasHeader={hasHeader}>
      {children}
    </Container>
  );
};

export default MainContainer;
