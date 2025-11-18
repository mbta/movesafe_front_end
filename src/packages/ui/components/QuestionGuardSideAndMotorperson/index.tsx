"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { MainContainer, QuestionText, OperatorSideTitle, CollapsedInfoContainer } from "./styles";
import QuestionCarButtonList from "../CarButtonList";
import messages from "@repo/constants/messages";
import CheckboxInspectionQuestion from "../CheckboxInspectionQuestion";

interface IAnswer {
  guardSide: string[];
  motorPersonSide: string[];
}

interface QuestionGuardSideAndMotorPersonProps {
  question: string;
  serialNumbers: string[];
  initialSelectedCars: IAnswer;
  onAnswer: (answer: IAnswer) => void;
  defaultIcon: ReactNode;
  defectIcon: ReactNode;
  children: ReactNode;
}

const QuestionGuardSideAndMotorPerson: React.FC<
  QuestionGuardSideAndMotorPersonProps
> = ({
  question,
  serialNumbers,
  initialSelectedCars,
  onAnswer,
  defaultIcon,
  defectIcon,
  children
}) => {
  const haveAnswer = initialSelectedCars && 
  (initialSelectedCars.guardSide.length || initialSelectedCars.motorPersonSide.length) ? true : false;
  const [checkboxStatus, setCheckboxStatus] = useState<boolean>(haveAnswer);

  const [guardSideSelectedCars, setGuardSideSelectedCars] = useState<string[]>(
    initialSelectedCars?.guardSide ?? []
  );
  const [motorPersonSideSelectedCars, setMotorPersonSideSelectedCars] =
    useState<string[]>(initialSelectedCars?.motorPersonSide ?? []);

  useEffect(() => {
    onAnswer({
      guardSide: guardSideSelectedCars,
      motorPersonSide: motorPersonSideSelectedCars,
    });
  }, [guardSideSelectedCars, motorPersonSideSelectedCars]);

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
        <>
          <OperatorSideTitle>{messages.Questions.guardSide}</OperatorSideTitle>
          <QuestionCarButtonList
            serialNumbers={serialNumbers}
            initialSelectedCars={initialSelectedCars?.guardSide ?? []}
            onSelectedCarsChange={setGuardSideSelectedCars}
            defaultIcon={defaultIcon}
            defectIcon={defectIcon}
          />
          <OperatorSideTitle>
            {messages.Questions.motorpersonSide}
          </OperatorSideTitle>
          <QuestionCarButtonList
            serialNumbers={serialNumbers}
            initialSelectedCars={initialSelectedCars?.motorPersonSide ?? []}
            onSelectedCarsChange={setMotorPersonSideSelectedCars}
            defaultIcon={defaultIcon}
            defectIcon={defectIcon}
          />
        </>
      )}
      {checkboxStatus &&
        <>
          {children}
        </>
      }
    </MainContainer>
  );
};

export default QuestionGuardSideAndMotorPerson;
