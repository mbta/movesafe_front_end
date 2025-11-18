"use client";
import React, { ReactNode } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  IMoveDetailsInspection,
  IMoveDetailsInspectionFormQuestion,
  QuestionTypes,
} from "@repo/models";
import {
  QuestionAnswerContainer,
  QuestionDescriptionContainer,
  LabelItem,
  LabelsContainer,
  QuestionContainer,
  SectionLabel,
  SerialNumbersContainer,
  DefectAnswerContainer,
  FailedLabel,
  YesNoAnswer,
  ColumnContainer,
  MotorPersonSideAnswerContainer,
  MotorPersonSideLabel,
  MinorDefectAnswerContainer,
  AnswersContainer,
  CommentText,
  CommentTitle,
  CommentSection,
} from "./styles";
import messages from "@repo/constants/messages";

interface InspectionTabContentProps {
  data: IMoveDetailsInspection;
  moveCars: string[];
}

interface QuestionAnswerProps {
  question: IMoveDetailsInspectionFormQuestion;
  moveCars: string[];
}

const SingleDefectQuestionAnswer = ({
  question,
  moveCars,
}: QuestionAnswerProps): ReactNode => {
  return moveCars.map((e) => {
    if (
      Array.isArray(question.selectedCars) &&
      question.selectedCars.includes(e)
    )
      return (
        <DefectAnswerContainer>
          <IoIosCloseCircleOutline />
          <FailedLabel>failed</FailedLabel>
        </DefectAnswerContainer>
      );
    else return <QuestionAnswerContainer key={e} />;
  });
};

const YesNoQuestionAnswer = ({ question }: QuestionAnswerProps): ReactNode => {
  if (typeof question.selectedCars !== "boolean" || !question.is_answered)
    return <></>;
  return <YesNoAnswer>{question.selectedCars ? "NO" : "YES"}</YesNoAnswer>;
};

const GuardSideMotorPersonQuestionAnswer = ({
  question,
  moveCars,
}: QuestionAnswerProps): ReactNode => {
  const isGuardSideDefect = (carSeriesNumber: string, answer: any): boolean => {
    return (
      answer &&
      typeof answer === "object" &&
      "guardSide" in answer &&
      answer.guardSide.includes(carSeriesNumber)
    );
  };

  const isMotorPersonSideDefect = (
    carSeriesNumber: string,
    answer: any
  ): boolean => {
    return (
      answer &&
      typeof answer === "object" &&
      "motorPersonSide" in answer &&
      answer.motorPersonSide.includes(carSeriesNumber)
    );
  };

  return (
    <ColumnContainer>
      <SerialNumbersContainer>
        <MotorPersonSideLabel>guard</MotorPersonSideLabel>
        {moveCars.map((e) => {
          if (isGuardSideDefect(e, question.selectedCars))
            return (
              <DefectAnswerContainer>
                <IoIosCloseCircleOutline />
                <FailedLabel>failed</FailedLabel>
              </DefectAnswerContainer>
            );
          else return <QuestionAnswerContainer key={e} />;
        })}
      </SerialNumbersContainer>
      <MotorPersonSideAnswerContainer>
        <MotorPersonSideLabel>motor person</MotorPersonSideLabel>
        {moveCars.map((e) => {
          if (isMotorPersonSideDefect(e, question.selectedCars))
            return (
              <DefectAnswerContainer>
                <IoIosCloseCircleOutline />
                <FailedLabel>failed</FailedLabel>
              </DefectAnswerContainer>
            );
          else return <QuestionAnswerContainer key={e} />;
        })}
      </MotorPersonSideAnswerContainer>
    </ColumnContainer>
  );
};

const DoubleDefectQuestionAnswer = ({
  question,
  moveCars,
}: QuestionAnswerProps): ReactNode => {
  const isMinorDefect = (carSeriesNumber: string, answer: any): boolean => {
    return (
      answer &&
      typeof answer === "object" &&
      "minorDefects" in answer &&
      answer.minorDefects.includes(carSeriesNumber)
    );
  };

  const isMajorDefect = (carSeriesNumber: string, answer: any): boolean => {
    return (
      answer &&
      typeof answer === "object" &&
      "majorDefects" in answer &&
      answer.majorDefects.includes(carSeriesNumber)
    );
  };

  return (
    <ColumnContainer>
      <SerialNumbersContainer>
        {moveCars.map((e) => {
          if (isMinorDefect(e, question.selectedCars))
            return (
              <MinorDefectAnswerContainer>
                <IoIosCloseCircleOutline />
                <FailedLabel>failed</FailedLabel>
              </MinorDefectAnswerContainer>
            );
          else if (isMajorDefect(e, question.selectedCars))
            return (
              <DefectAnswerContainer>
                <IoIosCloseCircleOutline />
                <FailedLabel>failed</FailedLabel>
              </DefectAnswerContainer>
            );
          else return <QuestionAnswerContainer key={e} />;
        })}
      </SerialNumbersContainer>
    </ColumnContainer>
  );
};

const QuestionAnswer = (props: QuestionAnswerProps): ReactNode => {
  switch (props.question.question_type) {
    case QuestionTypes.SingleDefectQuestion:
      return <SingleDefectQuestionAnswer {...props} />;

    case QuestionTypes.YesOrNoQuestion:
      return <YesNoQuestionAnswer {...props} />;

    case QuestionTypes.GuardSideAndMotorPersonQuestion:
      return <GuardSideMotorPersonQuestionAnswer {...props} />;

    case QuestionTypes.DoubleDefectQuestion:
      return <DoubleDefectQuestionAnswer {...props} />;

    default:
      return <></>;
  }
};

const InspectionTabContent: React.FC<InspectionTabContentProps> = ({
  data,
  moveCars,
}) => {
  const inspectionName = data.inspection_form.short_name;
  return (
    <>
      <LabelsContainer>
        <LabelItem>{messages.Labels.question}</LabelItem>
        <SerialNumbersContainer>
          {inspectionName !== "Car House Circle Checklist" &&
            moveCars.map((e) => <LabelItem key={e}>{e}</LabelItem>)}
        </SerialNumbersContainer>
      </LabelsContainer>
      <div>
        {data.inspection_form.inspection_form_sections.map((section) => {
          return (
            <div key={section.name}>
              <SectionLabel>{section.name}</SectionLabel>
              {section.inspection_form_questions.map((question) => (
                <QuestionContainer key={question.id}>
                  <QuestionDescriptionContainer>
                    {question.description}
                  </QuestionDescriptionContainer>
                  <AnswersContainer>
                    <SerialNumbersContainer>
                      <QuestionAnswer question={question} moveCars={moveCars} />
                    </SerialNumbersContainer>
                    {question.comments && (
                      <CommentSection>
                        <CommentTitle>Comment: </CommentTitle>
                        <CommentText>{question.comments}</CommentText>
                      </CommentSection>
                    )}
                  </AnswersContainer>
                </QuestionContainer>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InspectionTabContent;
