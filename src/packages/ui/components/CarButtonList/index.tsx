"use client";
import React, { ReactNode, useEffect } from "react";
import {
  TrainContainer,
  TrainUnitContainer,
  ButtonContainer,
  CarOrderIndicator,
  CarNumberText,
  SupText,
  Button,
} from "./styles";
import messages from "@repo/constants/messages";
import { useSelectedDefectCars } from "../../hooks/useSelectedDefectCars";

interface CarButtonListProps {
  serialNumbers: string[];
  initialSelectedCars?: string[];
  onSelectedCarsChange: (selectedCars: string[]) => void;
  defaultIcon: ReactNode;
  defectIcon: ReactNode;
}

const CarButtonList: React.FC<CarButtonListProps> = ({
  serialNumbers,
  initialSelectedCars = [],
  onSelectedCarsChange,
  defaultIcon,
  defectIcon,
}) => {
  const { selectedCars, handleButtonClick } =
    useSelectedDefectCars(initialSelectedCars);

  useEffect(() => {
    onSelectedCarsChange(selectedCars);
  }, [selectedCars, onSelectedCarsChange]);

  const filteredSerialNumbers = serialNumbers.filter(
    (serial) => !!serial
  )

  if (filteredSerialNumbers.length === 1) {
    return (
      <TrainContainer>
        <ButtonContainer>
          <TrainUnitContainer index={1}>
              <CarNumberText>{serialNumbers[0]}</CarNumberText>
              <Button
                onClick={() => handleButtonClick(serialNumbers[0])}
                selected={selectedCars.includes(serialNumbers[0])}
                isSmall={serialNumbers.length > 4}
              >
                {selectedCars.includes(serialNumbers[0]) ? defectIcon : defaultIcon}
              </Button>
          </TrainUnitContainer>
        </ButtonContainer>
      </TrainContainer>
    );
  }

  return (
    <TrainContainer>
      <CarOrderIndicator>
        {messages.Labels.firstCar}
        <SupText>{messages.Labels.st}</SupText>
      </CarOrderIndicator>
      <ButtonContainer>
        {serialNumbers.map((serial, index) => (
          <TrainUnitContainer key={serial} index={index}>
            <CarNumberText>{serial}</CarNumberText>
            <Button
              onClick={() => handleButtonClick(serial)}
              selected={selectedCars.includes(serial)}
              isSmall={serialNumbers.length > 4}
            >
              {selectedCars.includes(serial) ? defectIcon : defaultIcon}
            </Button>
          </TrainUnitContainer>
        ))}
      </ButtonContainer>
      {serialNumbers.length > 2 ? (
        <CarOrderIndicator>
          {messages.Labels.sixthCar}
          <SupText>{messages.Labels.th}</SupText>
        </CarOrderIndicator>
      ) : (
        <CarOrderIndicator>
          {messages.Labels.secondCar}
          <SupText>{messages.Labels.nd}</SupText>
        </CarOrderIndicator>
      )}
    </TrainContainer>
  );
};

export default CarButtonList;
