"use client";
import { MdAdd } from "react-icons/md";
import { metrics } from "@repo/themes";
import Image from "next/image";
import messages from "@repo/constants/messages";
import { IMove, YardMotorPersonRoles } from "@repo/models";
import {
  useCars,
  useMoveOrder,
  useMoveReasons,
  useSendMove,
  useTaskPanel,
} from "./hooks";
import {
  MainTitle,
  MainButton,
  EmptyListCard,
  TabView,
  Loader,
  TaskSelectionModal,
  Toast,
  InspectionCard,
  MoveCard,
  CreateMoveModal,
  ConfirmationModal,
} from "@repo/ui/components";
import {
  Container,
  TopContainer,
  CurrentTaskContainer,
  TabContainer,
  Title,
} from "./styles";
import { InspectionListTab, MoveListTab, MoveHistoryTab } from "./tabs";
import useMovesStore from "../stores/move.store";
import useLinesStore from "../stores/line.store";
import useYardsStore from "../stores/yard.store";
import ProtectedPage from "../auth/protectedPage";
import { MoveStatus } from "@repo/constants/constants";

const TaskPanel: React.FC = () => {
  const { selectedLine } = useLinesStore();
  const { selectedYard } = useYardsStore();
  const taskPanel = useTaskPanel();
  const { assignedMove, setAssignedMove } = useMovesStore();
  const sendMove = useSendMove();
  const { data: moveReasons = [] } = useMoveReasons();
  const { data: cars = [] } = useCars(selectedLine?.id);
  const moveOrder = useMoveOrder;

  const satelliteYard: boolean =
    selectedYard !== null && !selectedYard.is_main_yard;

  const handleTaskSelection = (item: IMove): void => {
    taskPanel.handleModalView();
    taskPanel.setSelectedTask(item);
  };

  if (taskPanel.isLoading) {
    return <Loader loading={taskPanel.isLoading} />;
  }

  return (
    <Container>
      <TopContainer>
        <Title>
          {selectedYard ? selectedYard.name : messages.TaskPanelScreen.title}
        </Title>
        {satelliteYard && (
          <MainButton
            text={messages.Labels.createMove}
            onClick={() => sendMove.setIsModalOpen(true)}
            hasIcon={true}
            icon={<MdAdd size={metrics.iconSize} />}
          />
        )}
      </TopContainer>
      <CurrentTaskContainer>
        <MainTitle text={messages.TaskPanelScreen.myTask} $fontSettings="H3" />
        {assignedMove?.status === MoveStatus.pending_checklist ? (
          <InspectionCard
            item={assignedMove}
            isFilled={false}
            onClick={() => {
              taskPanel.checkCancelledMove(assignedMove)
                ? taskPanel.setOpenCancelledMoveModal(true)
                : taskPanel.goToForms();
            }}
          />
        ) : assignedMove?.status === MoveStatus.pending_move ? (
          <MoveCard
            item={assignedMove}
            onClick={() => {
              taskPanel.checkCancelledMove(assignedMove)
                ? taskPanel.setOpenCancelledMoveModal(true)
                : taskPanel.goToFinishMove();
            }}
          />
        ) : (
          <EmptyListCard
            text={
              satelliteYard
                ? messages.EmptyCard.noTasks
                : messages.EmptyCard.noMoves
            }
            image={
              <Image
                src={`/assets/icon_train_placeholder.png`}
                alt={"img"}
                width="64"
                height="64"
              />
            }
          />
        )}
      </CurrentTaskContainer>
      <TabContainer>
        <TabView
          variant="white"
          options={[
            messages.TabletTabContent.inspectionList,
            messages.TabletTabContent.moveList,
            messages.TabletTabContent.moveHistory,
          ]}
          badgeValues={[
            taskPanel.data?.data.length ?? 0,
            taskPanel.moveListData?.data.length ?? 0,
            taskPanel.moveHistoryData?.data.length ?? 0,
          ]}
          children={[
            <InspectionListTab
              items={taskPanel.data?.data}
              onItemClick={handleTaskSelection}
              currentPage={taskPanel.currentInspectionListPage}
              totalPages={taskPanel.data?.pageCount ?? 0}
              setCurrentPage={taskPanel.setCurrentInspectionListPage}
              key={"inspections-list"}
            />,
            <MoveListTab
              items={taskPanel.moveListData?.data}
              onItemClick={handleTaskSelection}
              currentPage={taskPanel.currentMoveListPage}
              totalPages={taskPanel.moveListData?.pageCount ?? 0}
              setCurrentPage={taskPanel.setCurrentMoveListPage}
              key={"moves-list"}
            />,
            <MoveHistoryTab
              items={taskPanel.moveHistoryData?.data}
              currentPage={taskPanel.currentHistoryPage}
              totalPages={taskPanel.moveHistoryData?.pageCount ?? 0}
              setCurrentPage={taskPanel.setCurrentHistoryPage}
              key={"history"}
            />,
          ]}
        />
      </TabContainer>

      {taskPanel.openModal && (
        <TaskSelectionModal
          show={taskPanel.openModal}
          taskSelected={taskPanel.selectedTask}
          onAssignClick={() => taskPanel.assignTask()}
          onCloseClick={() => taskPanel.setOpenModal(false)}
        />
      )}

      {taskPanel.openCancelledMoveModal && (
        <ConfirmationModal
          show={taskPanel.openCancelledMoveModal}
          title={messages.TaskPanelScreen.myTask}
          text={messages.TaskPanelScreen.cancelledMove}
          confirmBtnText={messages.Labels.close}
          onConfirm={taskPanel.unassignedCurrentTask}
        />
      )}

      <CreateMoveModal
        isOpen={sendMove.isModalOpen}
        onClose={() => sendMove.setIsModalOpen(false)}
        moveReasons={moveReasons}
        yardMotorpersons={[]}
        moveOrder={moveOrder}
        cars={cars}
        yardId={selectedYard?.id || ""}
        sendFn={sendMove.onSend}
        selectedLine={selectedLine}
        isMobile
      />

      <Loader
        loading={
          taskPanel.loading ||
          sendMove.isLoading ||
          taskPanel.isLoadingAssignMove
        }
      />

      <Toast
        message={messages.MoveScreen.toast_fail_create_move}
        setVisible={sendMove.setShowErrorToast}
        visible={sendMove.showErrorToast}
      />

      <Toast
        message={messages.MoveScreen.toast_success_create_move}
        setVisible={sendMove.setShowSuccessToast}
        visible={sendMove.showSuccessToast}
        isSuccess
      />

      <Toast
        message={taskPanel.errorMessage}
        setVisible={taskPanel.setCallError}
        visible={taskPanel.callError}
      />
    </Container>
  );
};

export default ProtectedPage(TaskPanel, YardMotorPersonRoles);
