"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineSignature } from "react-icons/ai";
import SignatureModal from "../SignatureModal";
import IconButton from "../IconButton";
import MainButton from "../MainButton";
import Image from "next/image";
import { colors, metrics } from "@repo/themes";
import { IYardPerson, SelectOption, SignatureTypes } from "@repo/models";
import Toast from "../Toast";
import Select from "../Select";
import messages from "@repo/constants/messages";
import { 
  MdOutlineVisibility, 
  MdOutlineVisibilityOff, 
  MdOutlineChangeCircle 
} from "react-icons/md";
import {
  CardContainer,
  IconColumn,
  InfoColumn,
  ButtonColumn,
  Label,
  BadgeAndName,
  Badge,
  Name,
  RowContainer,
  ColumnContainer,
  LargeComboBox,
} from "./styles";

interface SignatureCardProps {
  label: string;
  user?: IYardPerson;
  userOptions?: IYardPerson[];
  signatureType: SignatureTypes;
  moveId: string;
  isSigned: boolean;
  setIsSigned: (isSigned: boolean) => void;
  dataUir?: string;
  onSign?: () => void;
}

const SignatureCard: React.FC<SignatureCardProps> = ({
  label,
  user,
  userOptions,
  signatureType,
  moveId,
  isSigned,
  setIsSigned,
  dataUir,
  onSign,
}) => {
  const [showSignature, setShowSignature] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEmptySignToast, setShowEmptySignToast] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IYardPerson | undefined>(
    user
  );

  useEffect(() => {
    let signature: string | null = "";
    let user: string | null = null;
    if (typeof window === "undefined") {
      signature = localStorage.getItem(`${signatureType}-${moveId}`);
      user = localStorage.getItem(`${signatureType}-${moveId}-user`);
    }
    if (signature) setIsSigned(true);
    if (user) setSelectedUser(JSON.parse(user));
  }, []);

  const handleSignClick = () => {
    setShowModal(true);
  };

  const handleToggleSignature = () => {
    setShowSignature(!showSignature);
  };

  const onEmptySign = (): void => {
    setShowEmptySignToast(true);
  };

  const usersSelectData: SelectOption<IYardPerson>[] =
    userOptions?.map((e: IYardPerson) => ({
      value: e,
      label: e.name,
    })) ?? [];

  const canChangeSignUser = () : boolean => {
    return (
      label.toLocaleLowerCase() !== messages.YardRoles.motorperson.toLocaleLowerCase() &&
      label.toLocaleLowerCase() !== messages.YardRoles.yardmaster.toLocaleLowerCase()
    );
  }

  return (
    <CardContainer>
      <ColumnContainer>
        <RowContainer>
          <IconColumn>
            <AiOutlineSignature
              size={metrics.iconBig}
              color={colors.darkBlue}
            />
          </IconColumn>
          {selectedUser ? (
            <>
              <InfoColumn>
                <Label>{label}</Label>
                <BadgeAndName>
                  <Badge>#{selectedUser.badge_number}</Badge>
                  <Name>{selectedUser.name}</Name>
                  {canChangeSignUser() &&
                  !isSigned &&
                    <MdOutlineChangeCircle
                      style={{marginLeft:"10px", marginTop:"-3px"}}
                      size={metrics.iconRegular}
                      color={colors.darkBlue}
                      onClick={() => setSelectedUser(undefined)}
                    />
                }
                </BadgeAndName>
              </InfoColumn>
              <ButtonColumn>
                {isSigned ? (
                  <IconButton
                    onClick={handleToggleSignature}
                    icon={
                      showSignature ? (
                        <MdOutlineVisibilityOff
                          size={metrics.iconSize}
                          color={colors.darkBlue}
                        />
                      ) : (
                        <MdOutlineVisibility
                          size={metrics.iconSize}
                          color={colors.darkBlue}
                        />
                      )
                    }
                  />
                ) : (
                  <MainButton
                    onClick={handleSignClick}
                    primary={false}
                    text={messages.Labels.addSign}
                  />
                )}
              </ButtonColumn>
            </>
          ) : (
            <>
              <LargeComboBox>
                <Select
                  inputTitle={label}
                  options={usersSelectData}
                  size={"small"}
                  onChange={(value: any) => setSelectedUser(value)}
                  value={selectedUser}
                />
              </LargeComboBox>
            </>
          )}
        </RowContainer>
        {showSignature && (
          <Image
            src={
              dataUir
                ? dataUir
                : typeof window !== "undefined"
                ? localStorage.getItem(`${signatureType}-${moveId}`) ?? ""
                : ""
            }
            alt={"signature image"}
            width={420}
            height={200}
            style={{ borderBottom: "1px solid black", margin: "1em 0 0 0" }}
          />
        )}
      </ColumnContainer>

      <SignatureModal
        show={showModal}
        onClose={() => setShowModal(false)}
        signatureType={signatureType}
        moveId={moveId}
        setIsSignatureCompleted={setIsSigned}
        onSign={onSign}
        onEmptySign={onEmptySign}
        label={label}
        user={selectedUser ?? { badge_number: "", name: "" }}
      />

      <Toast
        message={messages.Error.signatureEmpty}
        visible={showEmptySignToast}
        setVisible={setShowEmptySignToast}
      />
    </CardContainer>
  );
};

export default SignatureCard;
