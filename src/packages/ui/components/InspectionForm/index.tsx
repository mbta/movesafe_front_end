"use client";
import React from "react";
import { Container, FormName, Quantity } from "./styles";

interface InspectionFormProps {
  inspection: string;
  quantity: string;
}

const InspectionForm: React.FC<InspectionFormProps> = ({
  inspection,
  quantity,
}) => {
  return (
    <Container>
      <FormName>{inspection}</FormName>
      <Quantity>{quantity}</Quantity>
    </Container>
  );
};

export default InspectionForm;
