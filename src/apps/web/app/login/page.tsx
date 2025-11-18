"use client";
import { useEffect } from "react";
import { MainButton, Loader } from "@repo/ui/components";
import { Container, ButtonContainer, AppTitle } from "./styles";
import Image from "next/image";
import messages from "@repo/constants/messages";
import useLogin from "./hooks";
import { ComponentSizes } from "@repo/constants/constants";
import useAuthStore from "../stores/auth.store";

export default function Login() {
  const login = useLogin();
  const { isLoading, setIsLoading } = useAuthStore();

  useEffect(() => {
    setIsLoading(false);
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
            setIsLoading(true)
            login.handleLoginClick()
          }}
          size={ComponentSizes.full}
          invertedColors={true}
        />
      </ButtonContainer>

      <Loader loading={isLoading} />
    </Container>
  );
}
