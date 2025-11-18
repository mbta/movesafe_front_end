"use client";
import React, { Dispatch, SetStateAction } from "react";
import messages from "@repo/constants/messages";
import Image from "next/image";
import { IMove } from "@repo/models";
import { EmptyListCard, MoveCard, Pagination } from "@repo/ui/components";
import { Container } from "./styles";

interface MoveListProps {
  items?: IMove[];
  onItemClick: (item: IMove) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const MoveListTab: React.FC<MoveListProps> = ({
  items,
  onItemClick,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (!items || items.length === 0) {
    return (
      <EmptyListCard
        text={messages.EmptyCard.noMove}
        image={
          <Image
            src={`/assets/icon_train_placeholder.png`}
            alt={"img"}
            width="64"
            height="64"
          />
        }
      />
    );
  }

  return (
    <Container>
      {items.map((item) => (
        <MoveCard key={item.id} item={item} onClick={onItemClick} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </Container>
  );
};

export default MoveListTab;
