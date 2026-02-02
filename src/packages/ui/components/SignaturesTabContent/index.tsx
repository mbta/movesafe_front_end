"use client";
import { MoveStatus } from "@repo/constants/constants";
import messages from "@repo/constants/messages";
import { IMoveDetailsSignature, SignatureTypes, User } from "@repo/models";
import { SignatureCard, Toast } from "@repo/ui/components";
import { useFormatString } from "@repo/ui/hooks";
import React, { Dispatch, SetStateAction } from "react";
import { RowContainer, SignatureContainer } from "./styles";

interface SignaturesTabContentProps {
  signatures: IMoveDetailsSignature[];
  moveId: string;
  onSign: () => void;
  yardmaster: User;
  didYardmasterSign: boolean;
  setDidYardmasterSign: Dispatch<SetStateAction<boolean>>;
  isManagement: boolean;
  showStatusError: boolean;
  showError: boolean;
  showSuccess: boolean;
  setShowStatusError: Dispatch<SetStateAction<boolean>>;
  setShowError: Dispatch<SetStateAction<boolean>>;
  setShowSuccess: Dispatch<SetStateAction<boolean>>;
  status: string;
}

const SignaturesTabContent: React.FC<SignaturesTabContentProps> = ({
  signatures,
  moveId,
  onSign,
  yardmaster,
  didYardmasterSign,
  setDidYardmasterSign,
  isManagement,
  showStatusError,
  showError,
  showSuccess,
  setShowStatusError,
  setShowError,
  setShowSuccess,
  status,
}: SignaturesTabContentProps) => {
  const stringFormatter = useFormatString();
  const hasYardMasterSignature: boolean = !!signatures.find(
    (signature) => signature.signature_type === SignatureTypes.yardmaster
  );
  const isSignatureDisabled = status === MoveStatus.done
  
  return (
    <>
      {yardmaster && !hasYardMasterSignature && !isManagement && !isSignatureDisabled && (
        <SignatureContainer>
          <SignatureCard
            label={stringFormatter.formatYardRole(SignatureTypes.yardmaster)}
            user={yardmaster}
            moveId={moveId}
            signatureType={SignatureTypes.yardmaster}
            isSigned={didYardmasterSign}
            setIsSigned={setDidYardmasterSign}
            onSign={onSign}
          />
        </SignatureContainer>
      )}
      <RowContainer>
        {signatures.map((signature) => (
          <SignatureContainer key={signature.uri}>
            <SignatureCard
              label={stringFormatter.formatYardRole(signature.signature_type)}
              user={signature.user}
              moveId={moveId}
              signatureType={signature.signature_type as SignatureTypes}
              isSigned={true}
              setIsSigned={() => {}}
              dataUir={signature.uri}
            />
          </SignatureContainer>
        ))}
      </RowContainer>

      <Toast
        message={messages.DetailsModal.successSignature}
        visible={showSuccess}
        setVisible={setShowSuccess}
        isSuccess={true}
      />

      <Toast
        message={messages.DetailsModal.failedSignature}
        visible={showError}
        setVisible={setShowError}
      />

      <Toast
        message={messages.DetailsModal.failedSignatureStatus}
        visible={showStatusError}
        setVisible={setShowStatusError}
      />
    </>
  );
};

export default SignaturesTabContent;
