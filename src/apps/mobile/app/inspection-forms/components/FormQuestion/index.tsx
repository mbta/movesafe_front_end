import {
  IAnswer,
  IInspectionAnswerDTO,
  IQuestionDoubleDefectAnswer,
  IQuestionGuardSideAndMotorPersonAnswer,
  QuestionTypes,
} from "@repo/models";
import { colors, metrics } from "@repo/themes";
import {
  CommentDefectForm,
  QuestionDoubleDefect,
  QuestionGuardSideAndMotorPerson,
  QuestionSingleDefect,
  QuestionYesNo,
  TrainIcon,
} from "@repo/ui/components";
import { ChangeEvent, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import preTripQuestionOptions from "../../../../constants/preTripQuestionOptions";

interface FormQuestionProps {
  question: IInspectionAnswerDTO;
  serialNumbers: string[];
  onAnswer: (answer: IAnswer) => void;
}

const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  serialNumbers,
  onAnswer,
}: FormQuestionProps) => {
  const [shouldShowCommentsInput, setShouldShowCommentsInput] =
    useState<boolean>(!!question.comments);

  const returnShouldShowCommentsInput = (
    question: IInspectionAnswerDTO,
    answer: IAnswer
  ): boolean => {
    switch (question.question_type) {
      case QuestionTypes.SingleDefectQuestion:
        if (!Array.isArray(answer)) return false;
        return answer?.length > 0;

      case QuestionTypes.DoubleDefectQuestion:
        if (!(typeof answer === "object" && "minorDefects" in answer))
          return false;
        return answer.minorDefects.length > 0 || answer.majorDefects.length > 0;

      case QuestionTypes.GuardSideAndMotorPersonQuestion:
        if (!(typeof answer === "object" && "guardSide" in answer))
          return false;
        return answer.guardSide.length > 0 || answer.motorPersonSide.length > 0;

      case QuestionTypes.YesOrNoQuestion:
        if (!(typeof answer === "boolean")) return false;
        return !answer;

      default:
        return false;
    }
  };

  const onAnswerChange = (
    answer: IAnswer,
    question: IInspectionAnswerDTO
  ): void => {
    setShouldShowCommentsInput(returnShouldShowCommentsInput(question, answer));
    onAnswer(answer);
  };

  const renderCommentInput = () => {
    if (!shouldShowCommentsInput) return null;
    return (
      <CommentDefectForm
        questionComments={question.comments}
        maxLength={250}
        limitMessage="Limit of 250 characters."
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          (question.comments = event?.target?.value)
        }
      />
    );
  };

  switch (question.question_type) {
    case QuestionTypes.SingleDefectQuestion:
      return (
        <>
          <QuestionSingleDefect
            question={question.description}
            serialNumbers={serialNumbers}
            initialSelectedCars={question.answer as string[]}
            onSelectedCarsChange={(answer: IAnswer) =>
              onAnswerChange(answer, question)
            }
            defaultIcon={<TrainIcon />}
            defectIcon={
              <MdOutlineCancel color={colors.white} size={metrics.iconBig} />
            }
          >
            {renderCommentInput()}
          </QuestionSingleDefect>
        </>
      );

    case QuestionTypes.DoubleDefectQuestion:
      let doubleDefectAnswer = question.answer as IQuestionDoubleDefectAnswer;
      return (
        <>
          <QuestionDoubleDefect
            question={question.description}
            serialNumbers={serialNumbers}
            initialSelectedCars={doubleDefectAnswer}
            onSelectedCarsChange={(answer: IAnswer) =>
              onAnswerChange(answer, question)
            }
            options={preTripQuestionOptions}
          >
            {renderCommentInput()}
          </QuestionDoubleDefect>
        </>
      );

    case QuestionTypes.GuardSideAndMotorPersonQuestion:
      let initialAnswer =
        question.answer as IQuestionGuardSideAndMotorPersonAnswer;
      return (
        <>
          <QuestionGuardSideAndMotorPerson
            question={question.description}
            serialNumbers={serialNumbers}
            initialSelectedCars={initialAnswer}
            onAnswer={(answer: IAnswer) => onAnswerChange(answer, question)}
            defaultIcon={<TrainIcon />}
            defectIcon={
              <MdOutlineCancel size={metrics.iconBig} color={colors.white} />
            }
          >
            {renderCommentInput()}
          </QuestionGuardSideAndMotorPerson>
        </>
      );

    default:
      return (
        <>
          <QuestionYesNo
            question={question.description}
            initialAnswer={question.answer}
            onNo={() => onAnswerChange(false, question)}
            onYes={() => onAnswerChange(true, question)}
          >
            {renderCommentInput()}
          </QuestionYesNo>
        </>
      );
  }
};

export default FormQuestion;
