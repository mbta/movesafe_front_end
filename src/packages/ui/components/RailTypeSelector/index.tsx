"use client";
import React from "react";
import { Container, RadioGroup, RadioInput, RadioLabel } from "./styles";
import { RailOptions } from "@repo/models";

interface RailTypeSelectorProps {
  selectedOption: RailOptions;
  onOptionChange: (railOption: RailOptions) => void;
}

interface InputOption{
  label: string;
  value: RailOptions;
}

const inputOptions: InputOption[] = [
  { label: "Heavy Rail and Light Rail", value: RailOptions.both },
  { label: "Heavy Rail", value: RailOptions.heavy_rail },
  { label: "Light Rail", value: RailOptions.light_rail },
];

const RailTypeSelector: React.FC<RailTypeSelectorProps> = ({
  selectedOption,
  onOptionChange,
}) => {
  return (
    <Container>
      <RadioGroup>
        {inputOptions.map((option: InputOption) => (
          <RadioLabel key={option.value}>
            <RadioInput
              type="radio"
              name="transport"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onOptionChange(option.value)}
            />
            {option.label}
          </RadioLabel>
        ))}
      </RadioGroup>
    </Container>
  );
};

export default RailTypeSelector;
