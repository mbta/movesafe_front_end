"use client";
import React from "react";
import CarNumbersCard from "../CarNumbersCard";
import messages from "@repo/constants/messages";
import PriorityLabel from "../PriorityLabel";
import { IMove } from "@repo/models";
import Image from "next/image";
import { 
  CardContainer, 
  FromToContainer, 
  RowContainer,
  InformationText,
  LabelText,
  CardImgContainer
} from "./styles";

interface MoveCardProps {
  item: IMove;
  onClick: (item: IMove) => void
}

const MoveCard: React.FC<MoveCardProps> = ({
  item,
  onClick
}: MoveCardProps) => {
  return (
    <CardContainer onClick={() => onClick(item) }>
      <RowContainer>
        <InformationText>{item.move_reason.name}</InformationText>
        <PriorityLabel priority={item.priority_order.toString()} />
      </RowContainer>
      <FromToContainer>
        <LabelText>{messages.Labels.from}</LabelText>
        <InformationText>{item.move_from}</InformationText>
        <CardImgContainer>
          <Image
            src={`/assets/icon_move_arrow.png`}
            alt={"img"}
            width="30"
            height="20"
          />
        </CardImgContainer>
        <LabelText>{messages.Labels.to}</LabelText>
        <InformationText>{item.move_to}</InformationText>
      </FromToContainer>
      <CarNumbersCard
        carNumbers={item.move_cars}
      ></CarNumbersCard>
    </CardContainer>
  );
};

export default MoveCard;
