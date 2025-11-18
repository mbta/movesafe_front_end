"use client";
import React from "react";
import { Container, FormName } from "./styles";
import { IInspection } from "@repo/models";

interface FormListProps {
  inspections: IInspection[];
  isFilled: boolean;
}

const FormListInspectionCard: React.FC<FormListProps> = ({
  inspections,
  isFilled,
}) => {
  return (
    <Container>
      {inspections.map((inspection: IInspection) => (
        <FormName key={inspection.id} isFilled={isFilled}>
          {inspection.inspection_form &&
            `• ${inspection.inspection_form?.short_name}`}
        </FormName>
      ))}
    </Container>
  );
};

export default FormListInspectionCard;
