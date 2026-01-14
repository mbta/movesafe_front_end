"use client";
import React from "react";
import { 
	PaginationContainer, 
	PageButton 
} from "./styles";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	handlePageChange: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	totalPages,
	currentPage,
	handlePageChange
}) => {
  return (
		<PaginationContainer>
			{Array.from({ length: totalPages }, (_, index) => (
				<PageButton
					key={index}
					onClick={() => handlePageChange(index + 1)}
					active={index + 1 === currentPage}
				>
					{index + 1}
				</PageButton>
			))}
		</PaginationContainer>
  );
};

export default Pagination;