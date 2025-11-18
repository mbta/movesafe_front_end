"use client";
import React, { Dispatch, SetStateAction } from "react";
import messages from "@repo/constants/messages";
import Image from "next/image";
import { IMove } from "@repo/models";
import {
  EmptyListCard,
  MoveHistoryCard,
  Pagination,
} from "@repo/ui/components";
import { Container } from "./styles";

interface MoveHistoryProps {
  items?: IMove[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const MoveHistoryTab: React.FC<MoveHistoryProps> = ({
  items,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (!items || items.length === 0) {
    return (
      <EmptyListCard
        text={messages.EmptyCard.noHistory}
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
        <MoveHistoryCard key={item.id} item={item} onClick={() => {}} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </Container>
  );
};

export default MoveHistoryTab;
