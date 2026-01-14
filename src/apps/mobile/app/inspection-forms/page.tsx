"use client";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa6";
import {
  ConfirmationModal,
  CongratulationsModal,
  Loader,
  MainTitle,
  Toast,
} from "@repo/ui/components";
import { metrics } from "@repo/themes";
import { IconContainer, InspectionContainer, TitleContainer } from "./styles";
import InspectionFormsSteps from "./components/InspectionFormsSteps";
import InspectionFormSummary from "./components/InspectionFormSummary";
import InspectionFormQuestions from "./components/InspectionFormQuestions";
import InspectionFormButtons from "./components/InspectionFormButtons";
import InspectionFormSignatures from "./components/InspectionFormSignatures";
import useInspectionForms from "./hooks";
import messages from "@repo/constants/messages";
import {
  IInspectionFormAsCategoriesDTO,
  YardMotorPersonRoles,
} from "@repo/models";
import ProtectedPage from "../auth/protectedPage";

const InspectionForms: React.FC = () => {
  const inspectionForms = useInspectionForms();
  if (!inspectionForms) return;

  let currentInspectionResult: IInspectionFormAsCategoriesDTO = inspectionForms
    .activeStep?.inspection_form || { categories: [] };

  return (
    <>
      <TitleContainer>
        <IconContainer>
          <FaAngleLeft
            size={metrics.iconBig}
            onClick={() => inspectionForms.onBackButtonClick()}
          />
        </IconContainer>
        <MainTitle
          text={inspectionForms.assignedMove.move_reason.name}
          $fontSettings="H2"
        />
      </TitleContainer>

      <InspectionContainer>
        <InspectionFormsSteps
          activeStep={inspectionForms.activeStep}
          steps={inspectionForms.steps}
        />
        <InspectionFormSummary
          move={inspectionForms.assignedMove}
          step={inspectionForms.activeStep}
        />

        {inspectionForms.activeStep?.is_signature ? (
          <InspectionFormSignatures
            moveId={inspectionForms.assignedMove.id}
            moveHasForepersonSignature={
              inspectionForms.moveHasForepersonSignature
            }
            moveHasGuardSideSignature={
              inspectionForms.moveHasGuardSideSignature
            }
            isAgreementCheckboxChecked={
              inspectionForms.isAgreementCheckboxChecked
            }
            motorPersonUser={
              inspectionForms.assignedMove.inspections_done_by_user
            }
            motorPersonOptions={inspectionForms.yardMotorPersons ?? []}
            setIsAgreementCheckboxChecked={
              inspectionForms.setIsAgreementCheckboxChecked
            }
            setIsSignatureCompleted={inspectionForms.setIsSignatureCompleted}
            inspectionWithDefect={inspectionForms.defectFound}
          />
        ) : (
          <InspectionFormQuestions
            isLoading={inspectionForms.isLoading}
            inspectionResult={currentInspectionResult}
            serialNumbers={inspectionForms.serialNumbers}
          />
        )}

        <InspectionFormButtons
          isNextButtonDisabled={inspectionForms.isNextStepButtonDisabled()}
          isPreviousButtonDisabled={inspectionForms.isPreviousStepButtonDisabled()}
          isSendButtonDisabled={inspectionForms.isSendButtonDisabled()}
          isInspectionReturnButtonDisabled={inspectionForms.isInspectionReturnButtonDisabled()}
          isLastStep={inspectionForms.isLastStep()}
          saveInspectionResult={() =>
            inspectionForms.onSaveClick(currentInspectionResult)
          }
          onNextStepClick={() =>
            inspectionForms.onNextStepClick(currentInspectionResult)
          }
          onPreviousStepClick={() =>
            inspectionForms.onPreviousStepClick(currentInspectionResult)
          }
          onSend={() => inspectionForms.onSend()}
          onInspectionReturnClick={() =>
            inspectionForms.setShowInspectionReturnModal(true)
          }
        />
      </InspectionContainer>
      <Loader loading={inspectionForms.isLoading} />
      <Toast
        message={messages.InspectionFormsScreen.toast_fail}
        visible={inspectionForms.showErrorToast}
        setVisible={inspectionForms.setShowErrorToast}
      />
      <Toast
        message={messages.InspectionFormsScreen.toast_missing_answers}
        visible={inspectionForms.showWarningToast}
        setVisible={inspectionForms.setShowWarningToast}
      />
      <Toast
        message={messages.InspectionFormsScreen.toast_success}
        visible={inspectionForms.showSuccessToast}
        setVisible={inspectionForms.setShowSuccessToast}
        isSuccess
      />
      <CongratulationsModal
        show={inspectionForms.showCongratulationsModal}
        defect={inspectionForms.defectFound}
        taskName={inspectionForms.assignedMove.move_reason.name}
        onClose={() => inspectionForms.onCongratulationsModalClose()}
      />
      <ConfirmationModal
        title={messages.InspectionFormsScreen.inspection_return_title}
        text={messages.InspectionFormsScreen.inspection_return_text}
        show={inspectionForms.showInspectionReturnModal}
        confirmBtnText={messages.Labels.returnInspection}
        onClose={() => inspectionForms.setShowInspectionReturnModal(false)}
        onConfirm={() => inspectionForms.onConfirmInspectionReturnClick()}
      />

      <ConfirmationModal
        title={messages.InspectionFormsScreen.move_cancelled_title}
        text={messages.InspectionFormsScreen.move_cancelled_text}
        show={inspectionForms.showMoveCancelledModal}
        confirmBtnText={messages.Labels.returnInspection}
        onClose={() => inspectionForms.setShowMoveCancelledModal(false)}
        onConfirm={() => inspectionForms.onConfirmModalCancelledMoveClick()}
      />
    </>
  );
};

export default ProtectedPage(InspectionForms, YardMotorPersonRoles);
