"use client";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Overlay, ModalContent, TitleContainer, Title } from "./styles";
import { MdOutlineClose } from "react-icons/md";
import { IApiError, IMoveDetails } from "@repo/models";
import { Loader, TabView } from "@repo/ui/components";
import DetailsSummary from "../DetailsSummary";
import InspectionTabContent from "../InspectionTabContent";
import SignaturesTabContent from "../SignaturesTabContent";
import HistoryTabContent from "../HistoryTabContent";
import { useFormatString } from "@repo/ui/hooks";
import messages from "@repo/constants/messages";
import { MoveStatus } from "@repo/constants/constants";

interface DetailsModalProps {
  show: boolean;
  onClose: () => void;
  data: IMoveDetails | IApiError | undefined;
  moveId: string;
  isFetching: boolean;
  onSign: () => void;
  onCancelMoveClick: () => void;
  didYardmasterSign: boolean;
  setDidYardmasterSign: Dispatch<SetStateAction<boolean>>;
  isManagement: boolean;
  showSignatureStatusError: boolean;
  showSignatureError: boolean;
  showSignatureSuccess: boolean;
  setShowSignatureSuccess: Dispatch<SetStateAction<boolean>>;
  setShowSignatureStatusError: Dispatch<SetStateAction<boolean>>;
  setShowSignatureError: Dispatch<SetStateAction<boolean>>;
}

interface MessageModalProps {
  show: boolean;
  onClose: () => void;
}

const LoadingComponent = ({ show, onClose }: MessageModalProps): ReactNode => {
  if (!show) return null;

  return (
    <Overlay onClick={onClose}>
      <Loader loading={true} />
    </Overlay>
  );
};

const ErrorComponent = ({ show, onClose }: MessageModalProps): ReactNode => {
  if (!show) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TitleContainer>
          <MdOutlineClose
            size={24}
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </TitleContainer>
        <Title>error fetching data</Title>
      </ModalContent>
    </Overlay>
  );
};

const DetailsModal: React.FC<DetailsModalProps> = ({
  show,
  onClose,
  data,
  moveId,
  isFetching,
  onSign,
  onCancelMoveClick,
  didYardmasterSign,
  setDidYardmasterSign,
  isManagement,
  showSignatureStatusError,
  showSignatureError,
  showSignatureSuccess,
  setShowSignatureSuccess,
  setShowSignatureStatusError,
  setShowSignatureError,
}) => {
  const stringFormatter = useFormatString();
  if (isFetching) return <LoadingComponent show={show} onClose={onClose} />;

  if (!data || "errorMessage" in data)
    return <ErrorComponent show={show} onClose={onClose} />;

  const moveCarsSerialNumbers: string[] = data.move_cars
    .sort((a, b) => a.pair_order - b.pair_order)
    .map((e) => [e.first_car.series_number, e.second_car?.series_number])
    .flat()
    .filter((e) => !!e);

  const tabOptions: string[] = [
    ...data.inspections.map((e) => e.inspection_form.short_name),
    "Signature",
    "Employee History",
  ];

  const tabData: ReactNode[] = [
    ...data.inspections.map((e) => (
      <InspectionTabContent
        key={`inspection-${e.id}`}
        data={e}
        moveCars={moveCarsSerialNumbers}
      />
    )),
    <SignaturesTabContent
      key="signatures"
      signatures={data.signatures}
      moveId={moveId}
      onSign={onSign}
      yardmaster={data.yardmaster_user}
      didYardmasterSign={didYardmasterSign}
      setDidYardmasterSign={setDidYardmasterSign}
      isManagement={isManagement}
      showError={showSignatureError}
      showStatusError={showSignatureStatusError}
      showSuccess={showSignatureSuccess}
      setShowSuccess={setShowSignatureSuccess}
      setShowError={setShowSignatureError}
      setShowStatusError={setShowSignatureStatusError}
    />,
    <HistoryTabContent key="history" logs={data.audit_logs} />,
  ];

  if (!show) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TitleContainer>
          <Title>
            {messages.Labels.moveDetails} -{" "}
            {stringFormatter.formatReasonName(data.move_reason.name)}
          </Title>
          <MdOutlineClose
            size={30}
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </TitleContainer>
        <DetailsSummary
          data={data}
          onCancelMoveClick={onCancelMoveClick}
          isManagement={isManagement}
          cancelDisabled={
            data.status === MoveStatus.done ||
            data.status === MoveStatus.cancelled ||
            data.status === MoveStatus.inspection_failed ||
            data.status === MoveStatus.pending_yardmaster_signature ||
            data.status === MoveStatus.inspection_failed_pending_signature ||
            didYardmasterSign
          }
        />
        <TabView options={tabOptions} children={tabData} />
      </ModalContent>
    </Overlay>
  );
};

export default DetailsModal;
