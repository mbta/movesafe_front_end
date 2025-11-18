"use client";
import React from "react";
import messages from "@repo/constants/messages";
import { IMoveCar } from "@repo/models";
import useSortMoveCars from "./hooks";
import { CardContainer, CardText, CardTextSeparator, SupText } from "./styles";

interface CarNumbersCardProps {
  carNumbers: IMoveCar[];
}

const CarNumbersCard: React.FC<CarNumbersCardProps> = ({
  carNumbers,
}: CarNumbersCardProps) => {
  const sortedMoveCars = useSortMoveCars(carNumbers);

  if (carNumbers[0] && !carNumbers[0].second_car) {
    return (
      <CardContainer>
        <CardTextSeparator>
          {messages.Labels.carNumber}
        </CardTextSeparator>
        <CardText renderSmall={carNumbers.length > 1}>
          {carNumbers[0].first_car.series_number}
        </CardText>
      </CardContainer>
    )
  }
  return (
    <CardContainer>
      <CardTextSeparator>
        {messages.Labels.firstCar}
        <SupText>{messages.Labels.st}</SupText>
      </CardTextSeparator>

      {sortedMoveCars.map((moveCar, index) => (
        <React.Fragment key={moveCar.pair_order}>
          <CardText renderSmall={carNumbers.length > 1}>
            {moveCar.first_car.series_number}
          </CardText>
          <CardText renderSmall={carNumbers.length > 1}>
            {moveCar.second_car?.series_number}
          </CardText>
          {index !== carNumbers.length - 1 && (
            <CardTextSeparator>|</CardTextSeparator>
          )}
        </React.Fragment>
      ))}

      {carNumbers.length < 3 ? (
        <CardTextSeparator>
          {messages.Labels.secondCar}
          <SupText>{messages.Labels.nd}</SupText>
        </CardTextSeparator>
      ) : (
        <CardTextSeparator>
          {messages.Labels.sixthCar}
          <SupText>{messages.Labels.th}</SupText>
        </CardTextSeparator>
      )}
    </CardContainer>
  );
};

export default CarNumbersCard;
