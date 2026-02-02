"use client";

import { ComponentSizes } from "@repo/constants/constants";
import messages from "@repo/constants/messages";
import { Loader, MainButton, Toast } from "@repo/ui/components";
import Image from "next/image";
import { useEffect, useState } from "react";
import useLogin from "./hooks";
import { AppTitle, ButtonContainer, Container } from "./styles";

export default function Login() {
  const login = useLogin();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const checkAuth = async () => {
    login.setIsLoading(true);
    const authStatus = await login.checkAuthStatus();

    if (authStatus) {
      setTimeout(() => {
        login.setIsLoading(false);
      }, 0);
      login.onLoggedIn();
      return;
    }

    login.setIsLoading(false);
    if (authStatus === null) return;

    setToastMessage("Failed to complete Microsoft login.");
    setToastVisible(true);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container>
      <Image
        src={`/assets/logo_mbta_white.png`}
        alt={"img"}
        width="80"
        height="80"
      />
      <AppTitle>{messages.Labels.appName}</AppTitle>

      <ButtonContainer>
        <MainButton
          text={messages.Labels.signIn}
          onClick={() => {
            login.setIsLoading(true);
            login.handleLoginClick();
          }}
          size={ComponentSizes.full}
          invertedColors={true}
        />
      </ButtonContainer>

      <ButtonContainer>
        <MainButton
          text={messages.LoginScreen.microsoftSignIn}
          onClick={async () => {
            login.setIsLoading(true);
            await login.handleEntraIdLogin();
          }}
          size={ComponentSizes.full}
        />
      </ButtonContainer>

      <Loader loading={login.isLoading} />
      <Toast
        message={toastMessage}
        visible={toastVisible}
        setVisible={setToastVisible}
        isSuccess={false}
      />
    </Container>
  );
}
