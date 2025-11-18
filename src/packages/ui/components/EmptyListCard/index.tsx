"use client";
import React from "react";
import { CardContainer, CardText } from "./styles";

interface EmptyListCardProps {
  text: string;
  image: React.ReactNode;
}

const EmptyListCard: React.FC<EmptyListCardProps> = ({
  text,
  image,
}: EmptyListCardProps) => {
  return (
    <CardContainer>
      {image}
      <CardText>{text}</CardText>
    </CardContainer>
  );
};

export default EmptyListCard;
