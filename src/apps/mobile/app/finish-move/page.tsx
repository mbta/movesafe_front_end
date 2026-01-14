"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdArrowBackIos } from "react-icons/md";
import {
  CarNumbersCard,
  ConfirmationModal,
  Loader,
  MainButton,
  MainTitle,
  Toast,
} from "@repo/ui/components";
import {
  Container,
  Header,
  TaskTitleRow,
  FromRow,
  ButtonsRow,
  OrderText,
} from "./styles";
import messages from "@repo/constants/messages";
import { colors } from "@repo/themes";
import { useFinishMove } from "./hooks";
import { ScreenNames } from "@repo/constants/screens";
import ProtectedPage from "../auth/protectedPage";
import { YardMotorPersonRoles } from "@repo/models";

const FinishMove: React.FC = () => {
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [showErrorToast, setShowToastError] = useState(false);
  const finishMove = useFinishMove();
  const router = useRouter();

  const handleBackClick = () => {
    router.push(ScreenNames.taskPanel);
  };

  const handleReturnMove = () => {
    setShowReleaseModal(!showReleaseModal);
  };

  const handleConfirmReturnMove = () => {
    finishMove.returnMoveMutate();
    handleReturnMove();
  };

  return (
    <Container>
      <Header>
        <MdArrowBackIos size={32} onClick={handleBackClick} />
        <MainTitle text={messages.MoveScreen.title} $fontSettings="H2" />
      </Header>

      <TaskTitleRow>
        <MainTitle
          text={finishMove.assignedMove?.move_reason.name}
          $fontSettings="H3"
        />
        <OrderText>
          {"Order " + finishMove.assignedMove?.priority_order}
        </OrderText>
      </TaskTitleRow>

      <FromRow>
        <MainTitle
          text={messages.MoveScreen.from}
          $fontSettings="H3"
          color={colors.gray}
        />
        <MainTitle
          text={finishMove.assignedMove?.move_from}
          $fontSettings="H3"
        />
        <Image
          src={`/assets/icon_move_from_to_arrow.png`}
          alt={"img"}
          width="20"
          height="14"
        />
        <MainTitle
          text={messages.MoveScreen.to}
          $fontSettings="H3"
          color={colors.gray}
        />
        <MainTitle text={finishMove.assignedMove?.move_to} $fontSettings="H3" />
      </FromRow>

      <CarNumbersCard carNumbers={finishMove.assignedMove?.move_cars || []} />

      <ButtonsRow>
        <MainButton
          text={messages.MoveScreen.releaseBtn}
          primary={false}
          onClick={handleReturnMove}
        />
        <MainButton
          text={messages.MoveScreen.finishBtn}
          onClick={() => {
            finishMove.finishMoveMutate();
          }}
        />
      </ButtonsRow>

      {showReleaseModal && (
        <ConfirmationModal
          show={showReleaseModal}
          title={messages.MoveScreen.modalTitle}
          text={messages.MoveScreen.modalText}
          confirmBtnText={messages.Labels.returnInspection}
          onClose={() => setShowReleaseModal(false)}
          onConfirm={handleConfirmReturnMove}
        />
      )}
      <Loader
        loading={finishMove.finishMovePending || finishMove.returnMovePending}
      />
      {(finishMove.finishMoveData || finishMove.returnMoveData) && (
        <Toast
          message={"Error. Try again later."}
          visible={showErrorToast}
          setVisible={setShowToastError}
        />
      )}

      <Toast
        message={messages.FinishMove.successMessage}
        visible={finishMove.showSuccessToast}
        setVisible={finishMove.setShowSuccessToast}
        isSuccess
      />

      <Toast
        message={messages.InspectionFormsScreen.toast_fail}
        visible={finishMove.showErrorToast}
        setVisible={finishMove.setShowErrorToast}
      />

      <ConfirmationModal
        title={messages.InspectionFormsScreen.move_cancelled_title}
        text={messages.InspectionFormsScreen.move_cancelled_text}
        show={finishMove.showMoveCancelledModal}
        confirmBtnText={messages.Labels.returnInspection}
        onClose={() => finishMove.setShowMoveCancelledModal(false)}
        onConfirm={() => finishMove.onConfirmModalCancelledMoveClick()}
      />
    </Container>
  );
};

export default ProtectedPage(FinishMove, YardMotorPersonRoles);
