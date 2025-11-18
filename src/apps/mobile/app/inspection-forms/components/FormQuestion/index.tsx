import { MdOutlineCancel } from "react-icons/md";
import {
  QuestionDoubleDefect,
  QuestionSingleDefect,
  QuestionYesNo,
  QuestionGuardSideAndMotorPerson,
  TrainIcon,
  CommentDefectForm,
} from "@repo/ui/components";
import { colors, metrics } from "@repo/themes";
import preTripQuestionOptions from "../../../../constants/preTripQuestionOptions";
import {
  IAnswer,
  IInspectionAnswerDTO,
  IQuestionDoubleDefectAnswer,
  IQuestionGuardSideAndMotorPersonAnswer,
} from "@repo/models";
import { QuestionTypes } from "@repo/models";
import { ChangeEvent, useState } from "react";

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
            defaultIcon={<TrainIcon/>}
            defectIcon={
              <MdOutlineCancel color={colors.white} size={metrics.iconBig} />
            }
          >
            {shouldShowCommentsInput && (
              <CommentDefectForm
                questionComments={question.comments}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  (question.comments = event?.target?.value)
                }
              />
            )}
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
            {shouldShowCommentsInput && (
              <CommentDefectForm
                questionComments={question.comments}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  (question.comments = event?.target?.value)
                }
              />
            )}
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
            defaultIcon={<TrainIcon/>}
            defectIcon={<MdOutlineCancel size={metrics.iconBig} color={colors.white} />}
          >
          {shouldShowCommentsInput && (
            <CommentDefectForm
              questionComments={question.comments}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                (question.comments = event?.target?.value)
              }
            />
          )}
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
            {shouldShowCommentsInput && (
              <CommentDefectForm
                questionComments={question.comments}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  (question.comments = event?.target?.value)
                }
              />
            )}
          </QuestionYesNo>
        </>
      );
  }
};

export default FormQuestion;
