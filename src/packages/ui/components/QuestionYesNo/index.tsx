"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  ButtonDiv,
  YesButton,
  NoButton,
  Container,
  Title,
  TitleButton,
  QuestionContainer,
} from "./styles";

interface QuestionYesNoProps {
  question: string;
  initialAnswer: any;
  onYes: () => void;
  onNo: () => void;
  children: ReactNode;
}

const QuestionYesNo: React.FC<QuestionYesNoProps> = ({
  question,
  initialAnswer,
  onYes,
  onNo,
  children,
}) => {
  const [selectedButton, setSelectedButton] = useState<"yes" | "no" | null>();

  useEffect(() => {
    if (initialAnswer === true) setSelectedButton("yes");
    else if (initialAnswer === false) setSelectedButton("no");
  }, []);

  const mandatoryMark = 
    <span style={{color: '#DC2625', fontWeight: 'bold', fontSize: 20}}> *</span>;

  const handleYesClick = () => {
    setSelectedButton("yes");
    onYes();
  };

  const handleNoClick = () => {
    setSelectedButton("no");
    onNo();
  };

  return (
    <Container>
      <QuestionContainer>
        <Title>{question}{mandatoryMark}</Title>
        <ButtonDiv>
          <YesButton
            onClick={handleYesClick}
            isSelected={selectedButton === "yes"}
          >
            <TitleButton>YES</TitleButton>
          </YesButton>
          <NoButton onClick={handleNoClick} isSelected={selectedButton === "no"}>
            <TitleButton>NO</TitleButton>
          </NoButton>
        </ButtonDiv>
      </QuestionContainer>
      {children}
    </Container>
  );
};

export default QuestionYesNo;
