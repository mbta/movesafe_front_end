import React from "react";
import { ListContainer, List, HeaderRow, HeaderItem } from "./styles";
import InspectionListItem from "../InspectionListItem";
import { IMove } from "@repo/models";
import Pagination from "../Pagination";

interface InspectionListProps {
  currentItems: IMove[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleDetailsClick: (inspectionId: string) => void;
}

const headers: string[] = [
  "Date/Time",
  "Yardmaster",
  "Employee Badge",
  "Location",
  "Train Number",
  "Reason Move",
  "From",
  "To",
  "Order",
  "Status",
  "Tags",
  "Actions",
];

const InspectionList: React.FC<InspectionListProps> = ({
  currentItems,
  currentPage,
  totalPages,
  handlePageChange,
  handleDetailsClick,
}) => {
  return (
    <ListContainer>
      <List>
        <thead>
          <HeaderRow>
            {headers.map((header) => (
              <HeaderItem key={header}>{header}</HeaderItem>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {currentItems.map((data) => (
            <InspectionListItem
              key={data.id}
              inspectionData={data}
              status={data.status}
              handleDetailsClick={handleDetailsClick}
            />
          ))}
        </tbody>
      </List>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </ListContainer>
  );
};

export default InspectionList;
