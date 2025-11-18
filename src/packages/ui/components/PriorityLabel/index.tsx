"use client";
import React from "react";
import {
  TextLabel,
  Container,
  PriorityContainer,
} from "./styles";
import messages from "@repo/constants/messages";

interface PriorityLabelProps {
  priority: string;
}

const PriorityLabel: React.FC<PriorityLabelProps> = ({
  priority,
}: PriorityLabelProps) => {
  return (
    <Container>
      <TextLabel>{messages.Labels.order}</TextLabel>
      <PriorityContainer>
        <TextLabel>{priority}</TextLabel>
      </PriorityContainer>
    </Container>
  );
};

export default PriorityLabel;
