import { IInspectionFormsStep } from "../../../../models/inspectionFormsStep.model";
import { Container, Number, StepsContainer, Title } from "./styles";
import { ReactNode } from "react";

interface StepItemProps {
  step: IInspectionFormsStep;
  $isActive: boolean;
  $isComplete: boolean;
}

const StepItem = ({
  step,
  $isActive,
  $isComplete,
}: StepItemProps): ReactNode => {
  return (
    <Container $isActive={$isActive} $isComplete={$isComplete}>
      <Number $isActive={$isActive} $isComplete={$isComplete}>
        {step.number}
      </Number>
      <Title $isActive={$isActive} $isComplete={$isComplete}>
        {step.short_name}
      </Title>
    </Container>
  );
};

interface IInspectionFormsStepsProps {
  activeStep: IInspectionFormsStep | null;
  steps: IInspectionFormsStep[];
}

const InspectionFormsSteps: React.FC<IInspectionFormsStepsProps> = ({
  activeStep,
  steps,
}: IInspectionFormsStepsProps) => {
  return (
    <>
      <StepsContainer>
        {steps.map((step: IInspectionFormsStep, index: number) => (
          <StepItem
            $isActive={activeStep?.number === step.number}
            $isComplete={activeStep ? activeStep?.number > step.number : false}
            step={step}
            key={step.number}
          />
        ))}
      </StepsContainer>
    </>
  );
};

export default InspectionFormsSteps;
