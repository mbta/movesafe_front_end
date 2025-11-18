"use client";
import React from "react";
import { colors } from "@repo/themes";
import { MdOutlineClose } from "react-icons/md";
import { MainTitle, MainButton } from "@repo/ui/components";
import messages from "@repo/constants/messages";
import {
  Overlay,
  ModalContent,
  TextContainer,
  ButtonContainer,
  TitleContainer,
  CloseButtonContainer,
} from "./styles";

interface ConfirmationModalProps {
  show: boolean;
  title: string;
  text: string;
  confirmBtnText: string;
  onClose?: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  title,
  text = "",
  confirmBtnText = "",
  onClose,
  onConfirm,
}) => {
  return (
    <div>
      <Overlay show={show}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <TitleContainer>
            <TextContainer>{title}</TextContainer>
            <CloseButtonContainer>
              <MdOutlineClose size={40} onClick={onClose} />
            </CloseButtonContainer>
          </TitleContainer>

          <TextContainer>
            <MainTitle color={colors.gray} text={text} $fontSettings="H3" />
          </TextContainer>

          <ButtonContainer>
            {onClose && (
              <MainButton
                onClick={onClose}
                primary={false}
                text={messages.Labels.cancel}
              />
            )}
            <MainButton
              onClick={onConfirm}
              primary={false}
              text={confirmBtnText}
            />
          </ButtonContainer>
        </ModalContent>
      </Overlay>
    </div>
  );
};

export default ConfirmationModal;
