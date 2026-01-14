"use client";
import { CarSections } from "@repo/constants/constants";
import FormQuestion from "../FormQuestion";
import InspectionSection from "../InspectionSection";
import { LoadingContainer, RedAsterisk } from "./styles";
import {
  IAnswer,
  IInspectionAnswerDTO,
  IInspectionFormAsCategoriesDTO,
  IInspectionFormAsCategoriesDTOItem,
} from "@repo/models";

interface InspectionFormQuestionsProps {
  isLoading: boolean;
  serialNumbers: string[];
  inspectionResult: IInspectionFormAsCategoriesDTO;
}

const InspectionFormQuestions: React.FC<InspectionFormQuestionsProps> = ({
  isLoading,
  serialNumbers,
  inspectionResult,
}: InspectionFormQuestionsProps) => {
  if (isLoading) return <LoadingContainer>Loading...</LoadingContainer>;

  function categoryNameFormatted(category: IInspectionFormAsCategoriesDTOItem): JSX.Element {
    const hasQuestionType2 = category.questions.some(
      (question) => question.question_type === 2
    );
  
    return (
      <span>
        {category.categoryName}
        {hasQuestionType2 && <RedAsterisk> *</RedAsterisk>}
      </span>
    );
  }

  return (
    <>
      {inspectionResult?.categories
        .sort(
          (a, b) =>
            CarSections.indexOf(a.categoryName) -
            CarSections.indexOf(b.categoryName)
        )
        .map((category: IInspectionFormAsCategoriesDTOItem) => {
          return (
            <InspectionSection title={categoryNameFormatted(category)}>
              {category.questions.map((question: IInspectionAnswerDTO) => {
                return (
                  <FormQuestion
                    key={question.id}
                    question={question}
                    serialNumbers={serialNumbers}
                    onAnswer={(answer: IAnswer) => (question.answer = answer)}
                  />
                );
              })}
            </InspectionSection>
          );
        })}
    </>
  );
};

export default InspectionFormQuestions;
