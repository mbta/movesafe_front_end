import { IMove, ITag, User } from "@repo/models";
import { colors, metrics } from "@repo/themes";
import { useStatus } from "@repo/ui/hooks";
import React from "react";
import { FaTag } from "react-icons/fa6";
import { MdOutlineSearch } from "react-icons/md";
import useFormattedDate from "../../hooks/useFormatDate";
import IconButton from "../IconButton";
import Tooltip from "../Tooltip";
import {
  Badge,
  Container,
  IconButtonContainer,
  InfoBadge,
  InfoContainer,
  InfoData,
  InfoReasonMove,
  InfoStatus,
  InfoTitle,
  InfoTrainNumber,
  InfoYardmaster,
  LineCircle,
  LineLocationContainer,
  LocationText,
  RowContainer,
  StatusBackground,
  StatusContainer,
  TimeContainer,
  TrainNumbersContainer,
  TrainPairContainer,
} from "./styles";

interface InspectionListItemProps {
  inspectionData: IMove;
  status: string;
  handleDetailsClick: (inspectionId: string) => void;
}

const InspectionListItem: React.FC<InspectionListItemProps> = ({
  inspectionData,
  status,
  handleDetailsClick,
}) => {
  const statusStyle = useStatus();
  const formatDate = useFormattedDate();
  const { background, color, text } = statusStyle.moveStatusStyles(status);
  const { color: lineColor, initials } = statusStyle.yardLineColor(
    inspectionData.yard?.line?.name ?? ""
  );

  const inspectionMotorperson: User = {
    name: inspectionData.inspections_done_by_user
      ? inspectionData.inspections_done_by_user?.name
      : "",
    badge_number: inspectionData.inspections_done_by_user
      ? `#${inspectionData.inspections_done_by_user.badge_number}`
      : "--",
  };

  const inspectionYardmaster: User = {
    name: inspectionData.yardmaster_user
      ? inspectionData.yardmaster_user.name
      : "",
    badge_number: inspectionData.yardmaster_user
      ? `#${inspectionData.yardmaster_user.badge_number}`
      : "--",
  };

  const sortedMoveCars = (inspectionData.move_cars ?? [])
    .slice()
    .sort((a, b) => (a.pair_order ?? 0) - (b.pair_order ?? 0));

  const renderPairByIndex = (index: number): string => {
    const pair = sortedMoveCars[index];
    if (!pair) return "";

    const firstCar = pair.first_car?.series_number ?? "";
    const secondCar = pair.second_car?.series_number ?? "";

    return secondCar ? `${firstCar} - ${secondCar}` : firstCar;
  };

  return (
    <Container>
      <TimeContainer>
        <InfoData>
          {formatDate.formatDateTime(inspectionData.created_at)}
        </InfoData>
      </TimeContainer>
      <InfoYardmaster>
        <InfoTitle>{inspectionYardmaster.badge_number}</InfoTitle>
        <InfoData>{inspectionYardmaster.name}</InfoData>
      </InfoYardmaster>
      <InfoBadge>
        <InfoTitle>{inspectionMotorperson.badge_number}</InfoTitle>
        <InfoData>{inspectionMotorperson.name}</InfoData>
      </InfoBadge>
      <LineLocationContainer>
        <RowContainer>
          <LineCircle color={lineColor}>{initials}</LineCircle>
          <LocationText>{inspectionData.yard?.name}</LocationText>
        </RowContainer>
      </LineLocationContainer>
      <InfoTrainNumber>
        <TrainNumbersContainer>
          <TrainPairContainer>
            <InfoTitle>First</InfoTitle>
            <InfoData>{renderPairByIndex(0)}</InfoData>
          </TrainPairContainer>
          <TrainPairContainer>
            <InfoTitle>Second</InfoTitle>
            <InfoData>{renderPairByIndex(1)}</InfoData>
          </TrainPairContainer>
          <TrainPairContainer>
            <InfoTitle>Third</InfoTitle>
            <InfoData>{renderPairByIndex(2)}</InfoData>
          </TrainPairContainer>
        </TrainNumbersContainer>
      </InfoTrainNumber>
      <InfoReasonMove>
        <InfoData>{inspectionData.move_reason?.name}</InfoData>
      </InfoReasonMove>
      <InfoContainer>
        <InfoData>{inspectionData.move_from}</InfoData>
      </InfoContainer>
      <InfoContainer>
        <InfoData>{inspectionData.move_to}</InfoData>
      </InfoContainer>
      <InfoContainer>
        <InfoData>{inspectionData.priority_order}</InfoData>
      </InfoContainer>
      <StatusContainer>
        <StatusBackground background={background}>
          <InfoStatus color={color}>{text}</InfoStatus>
        </StatusBackground>
      </StatusContainer>
      <InfoContainer>
        <Tooltip
          text={inspectionData.tags.map((e: ITag) => e.name).join(",")}
          position="left"
        >
          <RowContainer>
            <FaTag size={metrics.iconRegular} color={colors.darkBlue} />
            <Badge>{inspectionData.tags.length}</Badge>
          </RowContainer>
        </Tooltip>
      </InfoContainer>
      <IconButtonContainer>
        <IconButton
          onClick={() => handleDetailsClick(inspectionData.id)}
          primary
          icon={<MdOutlineSearch color={colors.primaryBlue} size={20} />}
        />
      </IconButtonContainer>
    </Container>
  );
};

export default InspectionListItem;
