"use client";
import messages from "@repo/constants/messages";
import { IYardPerson, SignatureTypes } from "@repo/models";
import { SignatureCard } from "@repo/ui/components";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, InputContainer, Label } from "./styles";

interface InspectionFormSignaturesProps {
  moveId: string;
  moveHasGuardSideSignature: boolean;
  moveHasForepersonSignature: boolean;
  isAgreementCheckboxChecked: boolean;
  motorPersonUser: IYardPerson | null;
  motorPersonOptions: IYardPerson[];
  setIsAgreementCheckboxChecked: (isChecked: boolean) => void;
  setIsSignatureCompleted: (isCompleted: boolean) => void;
  inspectionWithDefect: boolean;
}

const InspectionFormSignatures: React.FC<InspectionFormSignaturesProps> = ({
  moveId,
  moveHasForepersonSignature,
  moveHasGuardSideSignature,
  isAgreementCheckboxChecked,
  setIsAgreementCheckboxChecked,
  setIsSignatureCompleted,
  motorPersonUser,
  motorPersonOptions,
  inspectionWithDefect,
}: InspectionFormSignaturesProps) => {
  const [isInspectorSignatureCompleted, setIsInspectorSignatureCompleted] =
    useState<boolean>(false);
  const [isGuardSideSignatureCompleted, setIsGuardSideSignatureCompleted] =
    useState<boolean>(!moveHasGuardSideSignature);
  const [isForepersonSignatureCompleted, setIsForepersonSignatureCompleted] =
    useState<boolean>(!moveHasForepersonSignature);

  const optionsWithoutMotorUser = motorPersonOptions.filter(
    (opt) => opt.badge_number !== motorPersonUser?.badge_number
  );

  useEffect(() => {
    if (
      isForepersonSignatureCompleted &&
      isGuardSideSignatureCompleted &&
      isInspectorSignatureCompleted
    )
      setIsSignatureCompleted(true);
  }, [
    isInspectorSignatureCompleted,
    isGuardSideSignatureCompleted,
    isForepersonSignatureCompleted,
  ]);

  return (
    <>
      <SignatureCard
        label={messages.YardRoles.motorperson}
        user={motorPersonUser ?? { badge_number: "", name: "" }}
        moveId={moveId}
        signatureType={SignatureTypes.inspector}
        isSigned={isInspectorSignatureCompleted}
        setIsSigned={setIsInspectorSignatureCompleted}
      />

      {moveHasGuardSideSignature && (
        <SignatureCard
          label={messages.YardRoles.guardSide}
          moveId={moveId}
          signatureType={SignatureTypes.guardside_inspector}
          isSigned={isGuardSideSignatureCompleted}
          setIsSigned={setIsGuardSideSignatureCompleted}
          userOptions={optionsWithoutMotorUser}
        />
      )}

      {moveHasForepersonSignature && (
        <SignatureCard
          label={messages.YardRoles.foreperson}
          moveId={moveId}
          signatureType={SignatureTypes.foreperson}
          isSigned={isForepersonSignatureCompleted}
          setIsSigned={setIsForepersonSignatureCompleted}
          userOptions={optionsWithoutMotorUser}
        />
      )}

      <InputContainer>
        <Input
          type="checkbox"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsAgreementCheckboxChecked(e.target.checked)
          }
          checked={isAgreementCheckboxChecked}
        />
        {inspectionWithDefect ? (
          <Label>{messages.Labels.confirmDefects}</Label>
        ) : (
          <Label>{messages.Labels.confirmNoDefects}</Label>
        )}
      </InputContainer>
    </>
  );
};

export default InspectionFormSignatures;
