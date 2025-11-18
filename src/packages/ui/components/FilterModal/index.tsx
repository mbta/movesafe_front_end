"use client";
import { ChangeEvent, useEffect, useState } from "react";
import messages from "@repo/constants/messages";
import MainButton from "../MainButton";
import {
  ButtonView,
  ModalContainer,
  ModalContent,
  SmallContentContainer,
  LargeContentContainer,
  InputContentContainer,
} from "./styles";
import { ComponentSizes } from "@repo/constants/constants";
import {
  ILine,
  IManagementDashboardFilter,
  IMoveReason,
  ITag,
  IYard,
  IYardPerson,
  SelectOption,
} from "@repo/models";
import {
  ModalHeader,
  Select,
  InputBox,
  InputMultiSelect,
} from "@repo/ui/components";
import { useStatus } from "@repo/ui/hooks";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filter: IManagementDashboardFilter) => void;
  yards: IYard[];
  lines: ILine[];
  yardmasters: IYardPerson[];
  motorpersons: IYardPerson[];
  moveReasons: IMoveReason[];
  tags: ITag[];
  setSelectedLineId: (lineId: string) => void;
  initialValue?: IManagementDashboardFilter | null;
}

interface ISelectItem {
  id: string;
  name: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onFilter,
  yards,
  lines,
  yardmasters,
  motorpersons,
  moveReasons,
  tags,
  setSelectedLineId,
  initialValue,
}) => {
  const moveStatus = useStatus();

  const MovePriorityOrder: SelectOption<ISelectItem>[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ].map((value) => ({
    id: value,
    value: {
      id: value,
      name: `${value}`,
    },
    label: `${value}`,
  }));

  const MoveStatusOptions: SelectOption<ISelectItem>[] =
    moveStatus.moveStatusList.map((value) => ({
      id: value,
      value: {
        id: value,
        name: `${moveStatus.moveStatusName(value)}`,
      },
      label: `${moveStatus.moveStatusName(value)}`,
    }));

  const tagOptions: SelectOption<ISelectItem>[] = tags.map((tag: ITag) => ({
    id: tag.id,
    value: tag,
    label: tag.name,
  }));

  const [line, setLine] = useState<ILine | null>(null);
  const [yard, setYard] = useState<IYard | null>(null);
  const [priorityOrder, setPriorityOrder] = useState<ISelectItem | null>(null);
  const [moveReason, setMoveReason] = useState<IMoveReason | null>(null);
  const [yardmaster, setYardmaster] = useState<IYardPerson | null>(null);
  const [motorperson, setMotorperson] = useState<IYardPerson | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [status, setStatus] = useState<ISelectItem | null>(null);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  useEffect(() => {
    if (initialValue) {
      const initialLine: ILine | null =
        lines.find((l) => l.id === initialValue.lineId) ?? null;
      const initialYard: IYard | null =
        yards.find((y) => y.id === initialValue.yardId) ?? null;
      const initialPriority: ISelectItem | null =
        MovePriorityOrder.find((m) => m.value.id === initialValue.priorityOrder)
          ?.value ?? null;
      const initialMoveReason: IMoveReason | null =
        moveReasons.find((m) => m.id === initialValue.moveReasonId) ?? null;
      const initialYardmaster: IYardPerson | null =
        yardmasters.find((l) => l.id === initialValue.yardmasterId) ?? null;
      const initialMotorperson: IYardPerson | null =
        motorpersons.find((l) => l.id === initialValue.motorpersonId) ?? null;
      const initialStatus: ISelectItem | null =
        MoveStatusOptions.find((m) => m.value.id === initialValue.status)
          ?.value ?? null;
      const initialTags = tags.filter((tag) =>
        initialValue.tagIds?.includes(tag.id)
      );

      setLine(initialLine);
      setYard(initialYard);
      setPriorityOrder(initialPriority);
      setMoveReason(initialMoveReason);
      setMotorperson(initialMotorperson);
      setYardmaster(initialYardmaster);
      setFrom(initialValue.from);
      setTo(initialValue.to);
      setStatus(initialStatus);
      setSelectedTags(initialTags);
    }
  }, [initialValue, lines, yards, moveReasons, yardmasters, motorpersons]);

  const onClearClick = (): void => {
    setLine(null);
    setYard(null);
    setPriorityOrder(null);
    setMoveReason(null);
    setMotorperson(null);
    setYardmaster(null);
    setFrom(null);
    setTo(null);
    setStatus(null);
    setSelectedTags([]);
  };

  const onApplyClick = (): void => {
    const filterValue: IManagementDashboardFilter = {
      lineId: line?.id ?? null,
      yardId: yard?.id ?? null,
      priorityOrder: priorityOrder?.id ?? null,
      moveReasonId: moveReason?.id ?? null,
      motorpersonId: motorperson?.id ?? null,
      yardmasterId: yardmaster?.id ?? null,
      from: from ?? null,
      to: to ?? null,
      status: status?.id ?? null,
      tagIds: selectedTags.map((e: ITag) => e.id),
    };
    onFilter(filterValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader title={messages.Labels.filterLabel} onClose={onClose} />
        <SmallContentContainer>
          <Select
            inputTitle={messages.FilterModal.line}
            onChange={(v: ILine) => {
              setLine(v);
              setSelectedLineId(v.id);
            }}
            options={lines.map((e: ILine) => {
              return { value: e, label: e.name };
            })}
            value={line?.id}
          />

          <Select
            inputTitle={messages.FilterModal.yard}
            onChange={(v: IYard) => setYard(v)}
            options={yards.map((e: IYard) => {
              return { value: e, label: e.name };
            })}
            value={yard?.id}
          />
        </SmallContentContainer>

        <LargeContentContainer>
          <Select
            inputTitle={messages.FilterModal.yardmaster}
            onChange={(v: IYardPerson) => setYardmaster(v)}
            options={yardmasters.map((e: IYardPerson) => {
              return { value: e, label: e.name };
            })}
            size={ComponentSizes.large}
            value={yardmaster?.id}
          />
        </LargeContentContainer>

        <LargeContentContainer>
          <Select
            inputTitle={messages.FilterModal.employeeBadge}
            onChange={(v: IYardPerson) => setMotorperson(v)}
            options={motorpersons.map((e: IYardPerson) => {
              return { value: e, label: e.name };
            })}
            size={ComponentSizes.large}
            value={motorperson?.id}
          />
        </LargeContentContainer>

        <LargeContentContainer>
          <Select
            inputTitle={messages.FilterModal.status}
            onChange={(v: ISelectItem) => setStatus(v)}
            options={MoveStatusOptions}
            size={ComponentSizes.large}
            value={status?.id}
          />
        </LargeContentContainer>

        <SmallContentContainer>
          <Select
            inputTitle={messages.FilterModal.priority}
            onChange={(v: ISelectItem) => setPriorityOrder(v)}
            options={MovePriorityOrder}
            value={priorityOrder?.id}
          />
          <Select
            inputTitle={messages.FilterModal.reason}
            onChange={(v: IMoveReason) => setMoveReason(v)}
            options={moveReasons.map((e: IMoveReason) => {
              return { value: e, label: e.name };
            })}
            value={moveReason?.id}
          />
        </SmallContentContainer>

        <InputContentContainer>
          <InputBox
            inputTitle={messages.FilterModal.from}
            size="small"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFrom(e.target.value)
            }
            value={from ?? ""}
          />
          <InputBox
            inputTitle={messages.FilterModal.to}
            size="small"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTo(e.target.value)
            }
            value={to ?? ""}
          />
        </InputContentContainer>

        <LargeContentContainer>
          <InputMultiSelect
            inputTitle={messages.FilterModal.tag}
            onChange={(v: ISelectItem[]) => setSelectedTags(v)}
            options={tagOptions}
            width="100%"
            value={selectedTags.map((value) => {
              return { value: value, label: value.name };
            })}
          />
        </LargeContentContainer>

        <ButtonView>
          <MainButton
            onClick={() => onClearClick()}
            text={messages.Labels.clear}
            primary={false}
          />
          <MainButton
            onClick={() => onApplyClick()}
            text={messages.Labels.applyFilter}
          />
        </ButtonView>
      </ModalContent>
    </ModalContainer>
  );
};

export default FilterModal;
