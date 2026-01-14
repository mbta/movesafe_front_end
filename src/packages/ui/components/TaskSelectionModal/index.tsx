"use client";
import React, { MouseEvent } from "react";
import messages from "@repo/constants/messages";
import MainButton from "../MainButton";
import { IMove } from "@repo/models";
import { colors, metrics } from "@repo/themes";
import { 
  MdAccessAlarm, 
  MdClose
} from "react-icons/md";
import {
  PriorityLabel,
  FormListInspectionCard,
  CarNumbersCard
} from '@repo/ui/components';
import { 
  Overlay, 
  ModalContent, 
  ModalTitle,
  TitleContainer,
  Separator,
  RowContainer,
  LeftAlignContainer,
  DateTimeText,
  ReasonTitle,
  FormsContainer,
  FormTitle,
  ContentContainer
} from "./styles";
import { useFormatDate } from "@repo/ui/hooks";

interface TaskSelectionModalProps {
  show: boolean;
  taskSelected: IMove | null;
  onAssignClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onCloseClick: () => void;
}

const TaskSelectionModal: React.FC<TaskSelectionModalProps> = ({
  show,
  taskSelected,
  onAssignClick,
  onCloseClick
}) => {
  const dateFormat = useFormatDate();
  if (!taskSelected) {
    return <></>;
  }

  const setModalButtonMessage = () => {
    return (
      taskSelected.status == "pending_move" ? 
        messages.TaskPanelScreen.assignMoveBtn : 
        taskSelected.inspections_done_by_user ?
          messages.TaskPanelScreen.acceptInspection :
          messages.TaskPanelScreen.assignTaskBtn
    )
  }

  return (
    <Overlay show={show} onClick={onCloseClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TitleContainer>
          <ModalTitle>{messages.TaskPanelScreen.assignTask}</ModalTitle>
          <MdClose onClick={onCloseClick} size={metrics.iconBig} />
        </TitleContainer>
        <Separator></Separator>

        <ContentContainer>
          <RowContainer>
            <LeftAlignContainer>
              <MdAccessAlarm 
                size={metrics.iconSmall} 
                color={colors.primaryBlue} 
              />
              <DateTimeText>
                {dateFormat.formatDateTime(taskSelected.created_at)}
              </DateTimeText>
            </LeftAlignContainer>
            <PriorityLabel priority={taskSelected.priority_order.toString()}/>
          </RowContainer>
          <ReasonTitle>{taskSelected.move_reason.name}</ReasonTitle>
          <FormsContainer>
            <FormTitle>{messages.Labels.form}</FormTitle>
            <FormListInspectionCard 
              inspections={taskSelected.inspections}
              isFilled={false}
            />
          </FormsContainer>
          <CarNumbersCard carNumbers={taskSelected.move_cars} />
        </ContentContainer>

        <MainButton
          onClick={onAssignClick}
          text={setModalButtonMessage()}
          size="full"
        />
      </ModalContent>
    </Overlay>
  );
};

export default TaskSelectionModal;
