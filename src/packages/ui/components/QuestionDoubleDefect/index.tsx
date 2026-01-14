"use client";
import React, { useState, useEffect, ReactNode } from "react";
import {
  TrainContainer,
  TrainUnitContainer,
  ButtonContainer,
  CarOrderIndicator,
  CarNumberText,
  SupText,
  Button,
  Container,
  Title,
  DefectOptionsContainer,
  DefectOption,
  QuestionText,
  CollapsedInfoContainer
} from "./styles";
import messages from "@repo/constants/messages";
import CheckboxInspectionQuestion from "../CheckboxInspectionQuestion";

interface IAnswer {
  minorDefects: string[];
  majorDefects: string[];
}

interface QuestionDoubleDefectProps {
  question: string;
  serialNumbers: string[];
  initialSelectedCars: IAnswer;
  onSelectedCarsChange: (answer: IAnswer) => void;
  options: OptionITem[];
  children: ReactNode;
}

interface OptionITem {
  color: string;
  icon: ReactNode;
  iconColored: ReactNode;
  value: OptionValues;
}

enum OptionValues {
  noDefect,
  minorDefect,
  majorDefect,
}

interface IButtonState {
  [key: string]: { color: string; icon: ReactNode; value: OptionValues };
}

const QuestionDoubleDefect: React.FC<QuestionDoubleDefectProps> = ({
  serialNumbers,
  initialSelectedCars,
  onSelectedCarsChange,
  options,
  question,
  children,
}) => {
  const haveAnswer = initialSelectedCars && 
    (initialSelectedCars.minorDefects.length || initialSelectedCars.majorDefects.length) ? true : false;
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [buttonState, setButtonState] = useState<IButtonState>({});
  const [checkboxStatus, setCheckboxStatus] = useState<boolean>(haveAnswer);

  useEffect(() => {
    const initialState = serialNumbers.reduce((acc, serial) => {
      const obj = returnInitialObj(serial);
      acc[serial] = obj;
      return acc;
    }, {} as IButtonState);
    setButtonState(initialState);
  }, [serialNumbers]);

  

  const returnInitialObj = (serial: string) => {
    let optionIndex: number = 0;

    if (initialSelectedCars?.majorDefects.includes(serial)) {
      optionIndex = 2;
    } else if (initialSelectedCars?.minorDefects.includes(serial)) {
      optionIndex = 1;
    }

    return {
      color: options[optionIndex].color,
      icon: options[optionIndex].iconColored,
      value: options[optionIndex].value,
    };
  };

  const handleButtonClick = (serial: string) => {
    setSelectedButton(serial === selectedButton ? null : serial);
  };

  const handleIconSelect = (serial: string, option: OptionITem) => {
    const newState: IButtonState = {
      ...buttonState,
      [serial]: {
        color: option.color,
        icon: option.iconColored,
        value: option.value,
      },
    };

    const newAnswer: IAnswer = {
      minorDefects: Object.keys(newState).filter(
        (key) => newState[key].value === OptionValues.minorDefect
      ),
      majorDefects: Object.keys(newState).filter(
        (key) => newState[key].value === OptionValues.majorDefect
      ),
    };

    setButtonState(newState);
    setSelectedButton(null);
    onSelectedCarsChange(newAnswer);
  };

  const filteredSerialNumbers = serialNumbers.filter(
    (serial) => !!serial
  )

  const changeAnswerStatus = (checked: boolean): void => {
    setCheckboxStatus(checked);
  }

  return (
    <Container>
      <CollapsedInfoContainer>
        <QuestionText>{question}</QuestionText>
        <CheckboxInspectionQuestion
          onChange={(checked) => changeAnswerStatus(checked)}
          hasAnswer={haveAnswer}
        />
      </CollapsedInfoContainer>
      {checkboxStatus && (
        <TrainContainer>
          {filteredSerialNumbers.length > 1 &&
            <CarOrderIndicator>
              {messages.Labels.firstCar}
              <SupText>{messages.Labels.st}</SupText>
            </CarOrderIndicator>
          }
          <ButtonContainer>
            {filteredSerialNumbers.map((serial, index) => (
              <TrainUnitContainer key={serial} index={index}>
                <CarNumberText>{serial}</CarNumberText>
                <Button
                  onClick={() => handleButtonClick(serial)}
                  selected={selectedButton === serial}
                  color={buttonState[serial]?.color || ""}
                  isSmall={filteredSerialNumbers.length > 4}
                >
                  {buttonState[serial]?.icon || options[0].icon}
                </Button>
                {selectedButton === serial && (
                  <DefectOptionsContainer isSmall={filteredSerialNumbers.length > 4}>
                    {options
                      .filter(
                        (option) => option.color !== buttonState[serial]?.color
                      )
                      .map((option) => (
                        <DefectOption
                          key={option.color}
                          onClick={() => handleIconSelect(serial, option)}
                          isSmall={filteredSerialNumbers.length > 4}
                        >
                          {option.icon}
                        </DefectOption>
                      ))}
                  </DefectOptionsContainer>
                )}
              </TrainUnitContainer>
            ))}
          </ButtonContainer>
          {filteredSerialNumbers.length === 1 ? 
            <></> :
            filteredSerialNumbers.length > 2 ? (
              <CarOrderIndicator>
                {messages.Labels.sixthCar}
                <SupText>{messages.Labels.th}</SupText>
              </CarOrderIndicator>
            ) : (
              <CarOrderIndicator>
                {messages.Labels.secondCar}
                <SupText>{messages.Labels.nd}</SupText>
              </CarOrderIndicator>
            )
          }
        </TrainContainer>
      )}
      {checkboxStatus &&
        <>
          {children}
        </>
      }
    </Container>
  );
};

export default QuestionDoubleDefect;
