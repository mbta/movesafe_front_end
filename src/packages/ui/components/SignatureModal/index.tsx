"use client";
import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { useSignature } from "../../hooks/useSignature";
import {
  Overlay,
  ModalContent,
  SignatureContainer,
  ButtonContainer,
  TitleContainer,
  IconColumn,
  InfoColumn,
  Label,
  BadgeAndName,
  Badge,
  Name,
  ClearContainer,
  SignatureLine,
  ClearButton,
} from "./styles";
import { colors, metrics } from "@repo/themes";
import MainTitle from "../MainTitle";
import MainButton from "../MainButton";
import { AiOutlineSignature } from "react-icons/ai";
import { IYardPerson, SignatureTypes } from "@repo/models";

interface SignatureModalProps {
  show: boolean;
  signatureType: SignatureTypes;
  moveId: string;
  label: string;
  user: IYardPerson;
  onClose: () => void;
  setIsSignatureCompleted: (isSigned: boolean) => void;
  onSign?: () => void;
  onEmptySign: () => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({
  show,
  moveId,
  signatureType,
  onClose,
  setIsSignatureCompleted,
  onSign,
  onEmptySign,
  label,
  user,
}) => {
  const {
    signatureCanvasRef,
    closeModal,
    clearSignature,
    saveSignature,
    returnSignatureCanvasWidth,
  } = useSignature();

  return (
    <div>
      <Overlay data-show={show}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <TitleContainer>
            <IconColumn>
              <AiOutlineSignature
                size={metrics.iconBig}
                color={colors.darkBlue}
              />
            </IconColumn>
            <InfoColumn>
              <Label>{label}</Label>
              <BadgeAndName>
                <Badge>#{user.badge_number}</Badge>
                <Name>{user.name}</Name>
              </BadgeAndName>
            </InfoColumn>
          </TitleContainer>
          <SignatureContainer>
            <SignatureCanvas
              ref={signatureCanvasRef}
              penColor={colors.black}
              backgroundColor={colors.white}
              canvasProps={{
                width: returnSignatureCanvasWidth(),
                height: 150,
                className: "signature-canvas",
              }}
            />
            <SignatureLine />
          </SignatureContainer>
          <ClearContainer>
            <ClearButton onClick={clearSignature}>CLEAR</ClearButton>
          </ClearContainer>
          <ButtonContainer>
            <MainButton
              onClick={() => closeModal(onClose)}
              primary={false}
              text={"CANCEL"}
            />
            <MainButton
              onClick={() => {
                saveSignature(
                  moveId,
                  signatureType,
                  onClose,
                  setIsSignatureCompleted,
                  onEmptySign,
                  user
                );
                if (onSign) onSign();
              }}
              text={"APPLY"}
            />
          </ButtonContainer>
        </ModalContent>
      </Overlay>
    </div>
  );
};

export default SignatureModal;
