"use client";
import React, { useState } from "react";
import Image from "next/image";
import MainTitle from "../MainTitle";
import IconButton from "../IconButton";
import { colors } from "@repo/themes";
import { ConfirmationModal, Tooltip } from "@repo/ui/components";
import messages from "@repo/constants/messages";
import {
  HeaderContainer,
  LeftView,
  RightView,
  InfoView,
  InfoText,
  InfoViewMobile,
} from "./styles";

interface HeaderProps {
  username?: string | null;
  showUserInfo?: boolean;
  onLogout: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  username = "",
  showUserInfo = false,
  onLogout,
  onLogoClick,
}: HeaderProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    onLogout();
  };

  const renderLogoutModal = () => {
    return (
      showModal && (
        <ConfirmationModal
          show={showModal}
          title={messages.Labels.logoutTitle}
          text={messages.Labels.logoutConfirm}
          confirmBtnText={messages.Labels.logoutBtn}
          onClose={() => setShowModal(false)}
          onConfirm={handleLogout}
        />
      )
    );
  };

  return (
    <HeaderContainer>
      <LeftView>
        <Image
          src={`/assets/logo_mbta_white.png`}
          alt="MBTA Logo"
          width="45"
          height="45"
          style={{ marginRight: "10px" }}
          onClick={onLogoClick}
        />
        <MainTitle
          text={messages.Labels.appName}
          $fontSettings="H3"
          color={colors.white}
        />
      </LeftView>

      <RightView>
        {showUserInfo ? (
          <InfoView>
            <Image
              src={`/assets/icon_user.png`}
              alt="User Icon"
              width="25"
              height="25"
            />
            <InfoText>{username}</InfoText>
          </InfoView>
        ) : (
          <Tooltip text={username?username:""}>
            <Image
              src={`/assets/icon_user.png`}
              alt="User Icon"
              width="30"
              height="30"
            />
          </Tooltip>
        )}
        <IconButton
          onClick={() => setShowModal(true)}
          icon={
            <Image
              src={`/assets/icon_logout.png`}
              alt="Logout Icon"
              width="25"
              height="25"
            />
          }
          primary={false}
        />
      </RightView>
      {renderLogoutModal()}
    </HeaderContainer>
  );
};

export default Header;
