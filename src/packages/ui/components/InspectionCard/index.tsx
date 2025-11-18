import React from "react";
import CarNumbersCard from "../CarNumbersCard";
import messages from "@repo/constants/messages";
import colors from "@repo/themes/colors";
import { MdAccessAlarm } from "react-icons/md";
import PriorityLabel from "../PriorityLabel";
import FormListInspectionCard from "../FormListInspectionCard";
import { metrics } from "@repo/themes";
import { IMove } from "@repo/models";
import {
  CardContainer,
  RowContainer,
  DateTimeText,
  LeftAlignContainer,
  ReasonTitle,
  FormTitle,
  FormsContainer,
} from "./styles";
import { useFormatDate, useFormatString } from "@repo/ui/hooks";

interface InspectionCardProps {
  item: IMove;
  isFilled: boolean;
  onClick: (item: IMove) => void;
}

const InspectionCard: React.FC<InspectionCardProps> = ({
  item,
  isFilled,
  onClick,
}: InspectionCardProps) => {
  const date = useFormatDate();
  const useString = useFormatString();
  return (
    <CardContainer onClick={() => onClick(item)}>
      <RowContainer>
        <LeftAlignContainer>
          <MdAccessAlarm size={metrics.iconSmall} color={colors.primaryBlue} />
          <DateTimeText>{date.formatDateTime(item.created_at)}</DateTimeText>
        </LeftAlignContainer>
        <PriorityLabel priority={item.priority_order.toString()} />
      </RowContainer>
      <ReasonTitle>
        {useString.formatReasonName(item.move_reason.name)}
      </ReasonTitle>
      <FormsContainer>
        <FormTitle>{messages.Labels.form}</FormTitle>
        <FormListInspectionCard
          inspections={item.inspections}
          isFilled={isFilled}
        />
      </FormsContainer>
      <CarNumbersCard carNumbers={item.move_cars} />
    </CardContainer>
  );
};

export default InspectionCard;
