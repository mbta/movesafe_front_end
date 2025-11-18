import React from "react";
import { colors } from "@repo/themes";
import IconButton from "../IconButton";
import { MdOutlineSearch } from "react-icons/md";
import { useStatus } from "@repo/ui/hooks";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoData,
  StatusContainer,
  StatusBackground,
  InfoStatus,
  TimeContainer,
  IconButtonContainer,
  InfoYardmaster,
  InfoBadge,
  InfoTrainNumber,
  InfoReasonMove,
} from "./styles";

interface InspectionData {
  time: string;
  yardmasterNumber: string;
  yardmasterName: string;
  employeeNumber: string;
  employeeName: string;
  firstF: string;
  secondF: string;
  firstS: string;
  secondS: string;
  firstT: string;
  secondT: string;
  from: string;
  to: string;
  reasonMove: string;
  order: string;
  status: string;
  line: string;
  location: string;
}

interface InspectionListItemProps {
  inspectionData: InspectionData;
  status:
    | "waiting"
    | "pending_checklist"
    | "pending_move"
    | "pending_yardmaster_signature"
    | "done"
    | "cancelled"
    | "inspection_failed"
    | "inspection_failed_pending_signature";
}

const InspectionListItem: React.FC<InspectionListItemProps> = ({
  inspectionData,
  status,
}) => {
  const {
    time,
    yardmasterNumber,
    yardmasterName,
    employeeNumber,
    employeeName,
    firstF,
    secondF,
    firstS,
    secondS,
    firstT,
    secondT,
    from,
    to,
    reasonMove,
    order,
  } = inspectionData;
  const moveStatus = useStatus();
  const { background, color, text } = moveStatus.moveStatusStyles(status);

  return (
    <Container>
      <TimeContainer>
        <InfoData>{time}</InfoData>
      </TimeContainer>
      <InfoYardmaster>
        <InfoTitle>{`#${yardmasterNumber}`}</InfoTitle>
        <InfoData>{yardmasterName}</InfoData>
      </InfoYardmaster>
      <InfoBadge>
        <InfoTitle>{`#${employeeNumber}`}</InfoTitle>
        <InfoData>{employeeName}</InfoData>
      </InfoBadge>
      <InfoTrainNumber>
        <InfoTitle>First</InfoTitle>
        <InfoData>{`${firstF} - ${secondF}`}</InfoData>
      </InfoTrainNumber>
      <InfoTrainNumber>
        <InfoTitle>Second</InfoTitle>
        <InfoData>{`${firstS} - ${secondS}`}</InfoData>
      </InfoTrainNumber>
      <InfoTrainNumber>
        <InfoTitle>Third</InfoTitle>
        <InfoData>{`${firstT} - ${secondT}`}</InfoData>
      </InfoTrainNumber>
      <InfoContainer>
        <InfoData>{from}</InfoData>
      </InfoContainer>
      <InfoContainer>
        <InfoData>{to}</InfoData>
      </InfoContainer>
      <InfoReasonMove>
        <InfoData>{reasonMove}</InfoData>
      </InfoReasonMove>
      <InfoContainer>
        <InfoData>{order}</InfoData>
      </InfoContainer>
      <StatusContainer>
        <StatusBackground background={background}>
          <InfoStatus color={color}>{text}</InfoStatus>
        </StatusBackground>
      </StatusContainer>
      <IconButtonContainer>
        <IconButton
          onClick={() => {}}
          primary
          icon={<MdOutlineSearch color={colors.primaryBlue} size={20} />}
        />
      </IconButtonContainer>
    </Container>
  );
};

export default InspectionListItem;
