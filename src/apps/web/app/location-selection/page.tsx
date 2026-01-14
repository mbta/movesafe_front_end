"use client";
import { useEffect, useRef } from "react";
import { MainTitle, Select, MainButton, Loader, Toast } from "@repo/ui/components";
import { ILine, IYard } from "@repo/models";
import useLocationSelection from "./hooks";
import { Container, ButtonContainer, SelectionContainer } from "./styles";
import messages from "@repo/constants/messages";
import { ComponentSizes } from "@repo/constants/constants";
import useAuthStore from "../stores/auth.store";

const LocationSelection: React.FC = () => {
  const locationSelection = useLocationSelection();

  if (locationSelection.isLoading)
    return <Loader loading={locationSelection.isLoading} />;

  return (
    <Container>
      <MainTitle text={messages.LocationSelection.title} $fontSettings="H2" />
      <SelectionContainer>
        <Select
          inputTitle={messages.LocationSelection.line}
          options={locationSelection.lineSelectData}
          onChange={(v: ILine) => locationSelection.setLine(v)}
          disabled={locationSelection.isFetchingLineData}
          size={ComponentSizes.large}
          value={locationSelection.line?.id}
        />

        <Select
          inputTitle={messages.LocationSelection.location}
          options={locationSelection.yardSelectData}
          onChange={(v: IYard) => locationSelection.setYard(v)}
          disabled={
            !locationSelection.line || locationSelection.isFetchingYardData
          }
          size={ComponentSizes.large}
          value={locationSelection.yard?.id}
        />

        <ButtonContainer>
          <MainButton
            text={messages.Labels.apply}
            disabled={locationSelection.isApplyBtnDisabled}
            onClick={() => locationSelection.applyLocationSelection()}
            size={ComponentSizes.full}
          />
        </ButtonContainer>
      </SelectionContainer>
      <Toast
        message={messages.Error.notAuthorized}
        visible={locationSelection.showNotAuthorizedToast}
        setVisible={locationSelection.setShowNotAuthorizedToast}
      />
    </Container>
  );
};

export default LocationSelection;
