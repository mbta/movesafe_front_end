"use client";
import React, { ReactNode, useState } from "react";
import { 
  MainContainer, 
  QuestionText,
  CollapsedInfoContainer,
} from "./styles";
import QuestionCarButtonList from "../CarButtonList";
import CheckboxInspectionQuestion from "../CheckboxInspectionQuestion";
import messages from "@repo/constants/messages";

interface QuestionSingleDefectProps {
  question: string;
  serialNumbers: string[];
  initialSelectedCars: string[];
  onSelectedCarsChange: (selectedCars: string[]) => void;
  defaultIcon: ReactNode;
  defectIcon: ReactNode;
  children: ReactNode;
}

const QuestionSingleDefect: React.FC<QuestionSingleDefectProps> = ({
  question,
  serialNumbers,
  initialSelectedCars,
  onSelectedCarsChange,
  defaultIcon,
  defectIcon,
  children
}) => {
  const haveAnswer = initialSelectedCars && initialSelectedCars.length ? true : false;

  const [checkboxStatus, setCheckboxStatus] = useState<boolean>(haveAnswer);

  const changeAnswerStatus = (checked: boolean): void => {
    setCheckboxStatus(checked);
  }

  return (
    <MainContainer>
      <CollapsedInfoContainer>
        <QuestionText>{question}</QuestionText>
        <CheckboxInspectionQuestion
          onChange={(checked) => changeAnswerStatus(checked)}
          hasAnswer={haveAnswer}
        />
      </CollapsedInfoContainer>
      {checkboxStatus && (
        <QuestionCarButtonList
          initialSelectedCars={initialSelectedCars}
          serialNumbers={serialNumbers}
          onSelectedCarsChange={onSelectedCarsChange}
          defaultIcon={defaultIcon}
          defectIcon={defectIcon}
        />
      )}
      {checkboxStatus &&
        <>
          {children}
        </>
      }
    </MainContainer>
  );
};

export default QuestionSingleDefect;
