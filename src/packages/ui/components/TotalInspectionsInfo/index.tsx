"use client";
import React from "react";
import {
  Container,
  DivInspection,
  Title,
  DivNumber,
  BigNumber,
  SmallNumber,
  Bar,
} from "./styles";

interface TotalInspectionsInfoProps {
  icon: React.ReactNode;
  title: string;
  bigNumber: string;
  smallNumber: string;
}

const TotalInspectionsInfo: React.FC<TotalInspectionsInfoProps> = ({
  bigNumber = "0",
  icon,
  title,
  smallNumber = "0",
}) => {
  return (
    <Container>
      {icon}
      <DivInspection>
        <Title>{title}</Title>
        <DivNumber>
          <BigNumber>{bigNumber}</BigNumber>
          <Bar>/</Bar>
          <SmallNumber>{smallNumber}</SmallNumber>
        </DivNumber>
      </DivInspection>
    </Container>
  );
};

export default TotalInspectionsInfo;
