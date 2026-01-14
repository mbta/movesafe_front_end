"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { Overlay, ModalContent, CongratsTitle, CongratsText, WarningContainer, WarningText } from "./styles";
import messages from "@repo/constants/messages";
import MainButton from "../MainButton";
import { MdOutlineWarningAmber } from "react-icons/md";
import { colors, metrics } from "@repo/themes";

interface CongratulationsModalProps {
  show: boolean;
  defect: boolean;
  taskName: string;
  onClose: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  show,
  defect,
  taskName,
  onClose,
}) => {
  return (
    <Overlay show={show} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {defect ?
          <>
            <Image
              src={`/assets/img_defect.png`}
              alt={"img"}
              width="400"
              height="200"
            />
            <CongratsTitle>{messages.Labels.defectTitle}</CongratsTitle>
            <CongratsText>
              {messages.Labels.defectText}
            </CongratsText>
            <WarningContainer>
              <MdOutlineWarningAmber  size={metrics.iconSize} color={colors.red} />
              <WarningText>{messages.Error.doNotMoveVehicle}</WarningText>
              <WarningText>{messages.Error.contactYardmaster}</WarningText>
            </WarningContainer>
          </>
          :
          <>
            <Image
              src={`/assets/img_congratulations.png`}
              alt={"img"}
              width="400"
              height="200"
            />
            <CongratsTitle>{messages.Labels.congratsTitle}</CongratsTitle>
            <CongratsText>
              {taskName} {messages.Labels.congratsText}
            </CongratsText>
          </>
        }
        <MainButton
          onClick={onClose}
          text={messages.Labels.close}
          size="medium"
        />
      </ModalContent>
    </Overlay>
  );
};

export default CongratulationsModal;
