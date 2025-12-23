"use client";
import { MoveStatus } from "@repo/constants/constants";
import messages from "@repo/constants/messages";
import {
  IMoveDetailsInspection,
  IMoveDetailsInspectionFormQuestion,
  QuestionTypes,
} from "@repo/models";
import React, { ReactNode } from "react";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoMdTime,
} from "react-icons/io";
import {
  AnswersContainer,
  ColumnContainer,
  CommentSection,
  CommentText,
  CommentTitle,
  DefectAnswerContainer,
  FailedLabel,
  LabelItem,
  LabelsContainer,
  MinorDefectAnswerContainer,
  MotorPersonSideAnswerContainer,
  MotorPersonSideLabel,
  PendingAnswerContainer,
  QuestionContainer,
  QuestionDescriptionContainer,
  SectionLabel,
  SerialNumbersContainer,
  SuccessAnswerContainer,
  WaitingAnswerContainer,
  YesNoAnswer,
} from "./styles";

interface InspectionTabContentProps {
  data: IMoveDetailsInspection;
  moveCars: string[];
  status: string;
}

interface QuestionAnswerProps {
  question: IMoveDetailsInspectionFormQuestion;
  moveCars: string[];
  status: string;
}

const getUnansweredStatus = (moveStatus: string): "pending" | "waiting" => {
  if (moveStatus === MoveStatus.pending_checklist) {
    return "pending";
  }
  return "waiting";
};

const StatusBadge = ({
  type,
  label,
}: {
  type: "success" | "failed" | "waiting" | "pending";
  label?: string;
}) => {
  switch (type) {
    case "success":
      return (
        <SuccessAnswerContainer>
          <IoIosCheckmarkCircleOutline size={18} />
          <FailedLabel>{label || messages.Labels.passed}</FailedLabel>
        </SuccessAnswerContainer>
      );
    case "failed":
      return (
        <DefectAnswerContainer>
          <IoIosCloseCircleOutline size={18} />
          <FailedLabel>{label || messages.Labels.failed}</FailedLabel>
        </DefectAnswerContainer>
      );
    case "pending":
      return (
        <PendingAnswerContainer>
          <IoMdTime size={18} />
          <FailedLabel>{messages.Labels.pending}</FailedLabel>
        </PendingAnswerContainer>
      );
    case "waiting":
      return (
        <WaitingAnswerContainer>
          {messages.Labels.waiting}
        </WaitingAnswerContainer>
      );
    default:
      return null;
  }
};

const SingleDefectQuestionAnswer = ({
  question,
  moveCars,
  status,
}: QuestionAnswerProps): ReactNode => {
  return moveCars.map((e) => {
    if (
      Array.isArray(question.selectedCars) &&
      question.selectedCars.includes(e)
    ) {
      return <StatusBadge key={e} type="failed" />;
    }

    if (question.is_answered) {
      return <StatusBadge key={e} type="success" />;
    }

    const unansweredStatus = getUnansweredStatus(status);
    return <StatusBadge key={e} type={unansweredStatus} />;
  });
};

const YesNoQuestionAnswer = ({
  question,
  status,
}: QuestionAnswerProps): ReactNode => {
  if (question.is_answered) {
    if (typeof question.selectedCars === "boolean") {
      return <YesNoAnswer>{question.selectedCars ? "NO" : "YES"}</YesNoAnswer>;
    }
    return <></>;
  }

  const unansweredStatus = getUnansweredStatus(status);
  return <StatusBadge type={unansweredStatus} />;
};

const GuardSideMotorPersonQuestionAnswer = ({
  question,
  moveCars,
  status,
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
          if (isGuardSideDefect(e, question.selectedCars)) {
            return <StatusBadge key={e} type="failed" />;
          }
          if (question.is_answered) {
            return <StatusBadge key={e} type="success" />;
          }
          const unansweredStatus = getUnansweredStatus(status);
          return <StatusBadge key={e} type={unansweredStatus} />;
        })}
      </SerialNumbersContainer>
      <MotorPersonSideAnswerContainer>
        <MotorPersonSideLabel>motor person</MotorPersonSideLabel>
        {moveCars.map((e) => {
          if (isMotorPersonSideDefect(e, question.selectedCars)) {
            return <StatusBadge key={e} type="failed" />;
          }
          if (question.is_answered) {
            return <StatusBadge key={e} type="success" />;
          }
          const unansweredStatus = getUnansweredStatus(status);
          return <StatusBadge key={e} type={unansweredStatus} />;
        })}
      </MotorPersonSideAnswerContainer>
    </ColumnContainer>
  );
};

const DoubleDefectQuestionAnswer = ({
  question,
  moveCars,
  status,
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
          if (isMinorDefect(e, question.selectedCars)) {
            return (
              <MinorDefectAnswerContainer key={e}>
                <IoIosCloseCircleOutline size={18} />
                <FailedLabel>{messages.Labels.minor}</FailedLabel>
              </MinorDefectAnswerContainer>
            );
          } else if (isMajorDefect(e, question.selectedCars)) {
            return <StatusBadge key={e} type="failed" />;
          } else if (question.is_answered) {
            return <StatusBadge key={e} type="success" />;
          } else {
            const unansweredStatus = getUnansweredStatus(status);
            return <StatusBadge key={e} type={unansweredStatus} />;
          }
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
  status,
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
                      <QuestionAnswer
                        question={question}
                        moveCars={moveCars}
                        status={status}
                      />
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
