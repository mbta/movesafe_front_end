"use client";
import { MainButton } from "@repo/ui/components";
import { Container } from "./styles";
import { ComponentSizes } from "@repo/constants/constants";

interface InspectionFormButtonsProps {
  isNextButtonDisabled: boolean;
  isPreviousButtonDisabled: boolean;
  isSendButtonDisabled: boolean;
  isInspectionReturnButtonDisabled: boolean;
  isLastStep: boolean;
  saveInspectionResult: () => void;
  onNextStepClick: () => void;
  onPreviousStepClick: () => void;
  onSend: () => void;
  onInspectionReturnClick: () => void;
}

const InspectionFormButton: React.FC<InspectionFormButtonsProps> = ({
  isNextButtonDisabled,
  isPreviousButtonDisabled,
  isSendButtonDisabled,
  isInspectionReturnButtonDisabled,
  isLastStep,
  saveInspectionResult,
  onNextStepClick,
  onPreviousStepClick,
  onSend,
  onInspectionReturnClick,
}: InspectionFormButtonsProps) => {
  return (
    <>
      <Container>
        <MainButton
          text="BACK"
          onClick={() => onPreviousStepClick()}
          primary={false}
          size={ComponentSizes.medium}
          disabled={isPreviousButtonDisabled}
        />
        <MainButton
          text="SAVE"
          onClick={() => saveInspectionResult()}
          primary={false}
          size={ComponentSizes.medium}
        />
        <MainButton
          text="RETURN INSPECTION"
          onClick={() => onInspectionReturnClick()}
          primary={false}
          size={ComponentSizes.medium}
          disabled={isInspectionReturnButtonDisabled}
        />
        {isLastStep ? (
          <MainButton
            text="SEND"
            onClick={() => onSend()}
            size={ComponentSizes.medium}
            disabled={isSendButtonDisabled}
          />
        ) : (
          <MainButton
            text="NEXT"
            onClick={() => onNextStepClick()}
            size={ComponentSizes.medium}
            disabled={isNextButtonDisabled}
          />
        )}
      </Container>
    </>
  );
};

export default InspectionFormButton;
