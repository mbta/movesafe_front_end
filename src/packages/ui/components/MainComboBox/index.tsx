"use client";
import React, { ChangeEvent } from "react";
import { DefaultComboBox, ComboBoxTitle, Container } from "./styles";

interface ComboBoxProps {
  options: string[];
  selectedOption: string;
  title?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const MainComboBox: React.FC<ComboBoxProps> = ({
  options,
  selectedOption,
  title,
  onChange,
}) => {
  return (
    <Container>
      <ComboBoxTitle>{title}</ComboBoxTitle>
      <DefaultComboBox as="select" value={selectedOption} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </DefaultComboBox>
    </Container>
  );
};

export default MainComboBox;
