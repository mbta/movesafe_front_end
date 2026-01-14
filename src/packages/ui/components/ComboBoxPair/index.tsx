"use client";
import React, { ChangeEvent } from "react";
import {
  PairContainer,
  PairTitle,
  SmallComboBoxContainer,
  Container,
  DefaultComboBox,
} from "./styles";

interface ComboBoxPairProps {
  title: string;
  options1: string[];
  options2: string[];
  selectedOption1: string;
  selectedOption2: string;
  onChange1?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChange2?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const ComboBoxPair: React.FC<ComboBoxPairProps> = ({
  title,
  options1,
  options2,
  selectedOption1,
  selectedOption2,
  onChange1,
  onChange2,
}) => {
  return (
    <PairContainer>
      <PairTitle>{title}</PairTitle>
      <SmallComboBoxContainer>
        <Container>
          <DefaultComboBox
            as="select"
            value={selectedOption1}
            onChange={onChange1}
          >
            {options1.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </DefaultComboBox>
        </Container>

        <Container>
          <DefaultComboBox
            as="select"
            value={selectedOption2}
            onChange={onChange2}
          >
            {options2.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </DefaultComboBox>
        </Container>
      </SmallComboBoxContainer>
    </PairContainer>
  );
};

export default ComboBoxPair;
