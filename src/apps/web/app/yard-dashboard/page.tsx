"use client";
import React from "react";
import { colors } from "@repo/themes";
import useLinesStore from "../stores/line.store";
import useYardsStore from "../stores/yard.store";
import {
  MainButton,
  MainContainer,
  MainTitle,
  Calendar,
  InspectionList,
  CreateMoveModal,
  Loader,
  Toast,
  ConfirmationModal,
  InformationModal,
} from "@repo/ui/components";
import {
  DashboardContainer,
  ViewDate,
  ViewInspectionList,
  ViewTitle,
  ViewCreateButton,
  ViewCreateMove,
  CreateText,
  YardTitle,
  MoveReasonsInfoContainer,
  MoveReasonsInfoText,
} from "./styles";
import {
  useSelectedDate,
  useMovesData,
  useMoveReasons,
  useCars,
  useMotorpersons,
  useMoveOrder,
  useSendMove,
} from "./hooks";
import { useInformationModal } from "@repo/ui/hooks";
import { YardMasterRoles } from "../../../../packages/models/src/userRoles.enum";
import { DetailsModal } from "@repo/ui/components";
import { useInspectionDetails } from "../management-dashboard/hooks";
import messages from "@repo/constants/messages";
import ProtectedPage from "../auth/protectedPage";

function YardDashboard() {
  const { selectedDate, handleDateSelected } = useSelectedDate();
  const { selectedLine } = useLinesStore();
  const { selectedYard } = useYardsStore();
  const { showInfoModal, setInfoModalVisibility } = useInformationModal();

  const items: any[] = [
    { name: "PULLBACK", description: "Waiting for MBTA guidelines." },
    { name: "PULLBACK WITH EVI", description: "Waiting for MBTA guidelines." },
    {
      name: "PULLBACK (SHOP ORDER)",
      description: "Waiting for MBTA guidelines.",
    },
    {
      name: "PULLOUT OR SERVICE TRAIN",
      description: "Waiting for MBTA guidelines.",
    },
    { name: "YARD MOVE (SHIFT)", description: "Waiting for MBTA guidelines." },
    { name: "SHOP RELEASE", description: "Waiting for MBTA guidelines." },
    { name: "TEST TRAIN", description: "Waiting for MBTA guidelines." },
    { name: "FAILURE IN SERVICE", description: "Waiting for MBTA guidelines." },
    { name: "REPLACEMENT TRAIN", description: "Waiting for MBTA guidelines." },
    { name: "HORSE OR DEAD ROW", description: "Waiting for MBTA guidelines." },
    { name: "YARD HOLD", description: "Waiting for MBTA guidelines." },
    { name: "SHOP ORDER", description: "Waiting for MBTA guidelines." },
    { name: "YARD HOLD+A14", description: "Waiting for MBTA guidelines." },
    { name: "LIGHT EXTRA", description: "Waiting for MBTA guidelines." },
    { name: "SNOW TRAIN", description: "Waiting for MBTA guidelines." },
    { name: "OBSERVE", description: "Waiting for MBTA guidelines." },
    {
      name: "TRAINING (Instruction Train)",
      description: "Waiting for MBTA guidelines.",
    },
    {
      name: "SHUTTLE (Yard to Yard Shift)",
      description: "Waiting for MBTA guidelines.",
    },
  ];

  const {
    isLoading,
    onSend,
    setShowErrorToast,
    showErrorToast,
    setShowSuccessToast,
    showSuccessToast,
    isModalOpen,
    setIsModalOpen,
  } = useSendMove();

  const {
    movesData = { data: [], pageCount: 0 },
    movesLoading,
    currentPage,
    setCurrentPage,
  } = useMovesData(selectedDate, selectedYard?.id ?? "");

  const { data: moveReasons = [] } = useMoveReasons();
  const { data: yardMotorpersons = [] } = useMotorpersons(selectedLine?.id);
  const { data: cars = [] } = useCars(selectedLine?.id);

  const moveOrder = useMoveOrder;
  const inspectionDetails = useInspectionDetails();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isCreateMoveEnabled = (): boolean => {
    return (
      selectedDate !== null &&
      new Date(selectedDate.toDateString()) >=
        new Date(new Date().toDateString())
    );
  };

  if (movesLoading || !selectedYard) return <Loader loading />;

  return (
    <MainContainer color={colors.offWhite}>
      <DashboardContainer>
        <ViewTitle>
          <YardTitle>{selectedYard?.name || messages.Labels.yard}</YardTitle>
          <ViewDate>
            <Calendar
              startDate={selectedDate}
              onDateSelected={handleDateSelected}
            />
          </ViewDate>
        </ViewTitle>

        {movesData && movesData.data?.length ? (
          <ViewInspectionList>
            <ViewTitle>
              <MainTitle text={messages.Labels.moves} $fontSettings="H1" />
              {isCreateMoveEnabled() && (
                <MainButton
                  onClick={openModal}
                  text={messages.Labels.createMove}
                  primary
                />
              )}
            </ViewTitle>
            <InspectionList
              currentItems={movesData.data}
              currentPage={currentPage}
              totalPages={movesData.pageCount}
              handlePageChange={setCurrentPage}
              handleDetailsClick={inspectionDetails.handleDetailsClick}
            />
          </ViewInspectionList>
        ) : (
          <ViewInspectionList>
            <ViewTitle>
              <MainTitle text={messages.Labels.moves} $fontSettings="H1" />
            </ViewTitle>
            <ViewCreateMove>
              <CreateText>
                {isCreateMoveEnabled()
                  ? messages.EmptyCard.noMoveCreatedCreate
                  : messages.EmptyCard.noMoveCreated}
              </CreateText>
              <ViewCreateButton>
                {isCreateMoveEnabled() && (
                  <MainButton
                    onClick={openModal}
                    text={messages.Labels.createMove}
                    primary
                  />
                )}
              </ViewCreateButton>
            </ViewCreateMove>
          </ViewInspectionList>
        )}
      </DashboardContainer>

      <CreateMoveModal
        isOpen={isModalOpen}
        onClose={closeModal}
        moveReasons={moveReasons}
        yardMotorpersons={yardMotorpersons}
        moveOrder={moveOrder}
        cars={cars}
        yardId={selectedYard?.id || ""}
        sendFn={onSend}
        selectedLine={selectedLine}
        setInfoModalVisibility={() => setInfoModalVisibility(true)}
      />

      <DetailsModal
        show={inspectionDetails.detailsOpened}
        onClose={() => inspectionDetails.onDetailsModalClose()}
        data={inspectionDetails.data}
        moveId={inspectionDetails.selectedInspectionId ?? ""}
        isFetching={inspectionDetails.isFetching}
        onSign={inspectionDetails.postSignature}
        onCancelMoveClick={inspectionDetails.onCancelMoveClick}
        didYardmasterSign={inspectionDetails.didYardmasterSign}
        setDidYardmasterSign={inspectionDetails.setDidYardmasterSign}
        showSignatureError={inspectionDetails.showSignatureErrorToast}
        showSignatureSuccess={inspectionDetails.showSuccessToast}
        showSignatureStatusError={
          inspectionDetails.showSignatureStatusErrorToast
        }
        setShowSignatureSuccess={inspectionDetails.setShowSuccessToast}
        setShowSignatureError={inspectionDetails.setShowSignatureErrorToast}
        setShowSignatureStatusError={
          inspectionDetails.setShowSignatureStatusErrorToast
        }
        isManagement={false}
      />

      <ConfirmationModal
        show={inspectionDetails.showConfirmationModal}
        title={messages.Labels.cancelMoveTitle}
        text={messages.Labels.inspectionWarning}
        confirmBtnText={messages.Labels.confirmCancel}
        onClose={inspectionDetails.onCloseConfirmationModal}
        onConfirm={inspectionDetails.onConfirmCancelMove}
      />

      <InformationModal
        visibility={showInfoModal}
        onClose={() => setInfoModalVisibility(false)}
        title={messages.CreateMove.reason}
        content={
          <div>
            {items.map((item, index) => (
              <MoveReasonsInfoContainer key={index}>
                <MainTitle text={item.name} />
                <MoveReasonsInfoText>{item.description}</MoveReasonsInfoText>
              </MoveReasonsInfoContainer>
            ))}
          </div>
        }
      />

      <Loader loading={isLoading || inspectionDetails.isLoading} />

      <Toast
        message={messages.MoveScreen.toast_fail_create_move}
        setVisible={setShowErrorToast}
        visible={showErrorToast}
      />

      <Toast
        message={messages.MoveScreen.toast_success_create_move}
        setVisible={setShowSuccessToast}
        visible={showSuccessToast}
        isSuccess
      />

      <Toast
        message={messages.MoveScreen.toast_fail_cancel_move}
        visible={inspectionDetails.showErrorToast}
        setVisible={inspectionDetails.setShowErrorToast}
      />

      <Toast
        message={messages.MoveScreen.toast_success_cancel_move}
        visible={inspectionDetails.showSuccessToast}
        setVisible={inspectionDetails.setShowSuccessToast}
        isSuccess
      />
    </MainContainer>
  );
}

export default ProtectedPage(YardDashboard, YardMasterRoles);
