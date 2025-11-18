"use client";
import { Select, MainButton, Loader, Toast } from "@repo/ui/components";
import { ILine, IYard } from "@repo/models";
import useLocationSelection from "./hooks";
import {
  Container,
  ButtonContainer,
  SelectionContainer,
  Title,
} from "./styles";
import messages from "@repo/constants/messages";
import { ComponentSizes } from "@repo/constants/constants";
import useAuthStore from "../stores/auth.store";

const LocationSelection: React.FC = () => {
  const locationSelection = useLocationSelection();
  const { isLoading, isAuthenticated } = useAuthStore();

  if (isLoading) return <Loader loading={isLoading} />;

  return (
    <Container>
      <Title $fontSetting="H2">{messages.LocationSelection.title}</Title>
      <SelectionContainer>
        <Select
          inputTitle={messages.LocationSelection.line}
          options={locationSelection.lineSelectData}
          onChange={(v: ILine) => locationSelection.setLine(v)}
          disabled={locationSelection.isFetchingLineData}
          size={ComponentSizes.full}
          value={locationSelection.line?.id}
        />

        <Select
          inputTitle={messages.LocationSelection.location}
          options={locationSelection.yardSelectData}
          onChange={(v: IYard) => locationSelection.setYard(v)}
          disabled={
            !locationSelection.line || locationSelection.isFetchingYardData
          }
          size={ComponentSizes.full}
          value={locationSelection.yard?.id}
        />
      </SelectionContainer>
      <ButtonContainer>
        <MainButton
          text={messages.Labels.apply}
          disabled={locationSelection.isApplyBtnDisabled}
          onClick={() => locationSelection.applyLocationSelection()}
          size="full"
        />
      </ButtonContainer>
      <Toast
        message={messages.Error.notAuthorized}
        visible={locationSelection.showNotAuthorizedToast}
        setVisible={locationSelection.setShowNotAuthorizedToast}
      />
    </Container>
  );
};

export default LocationSelection;
