"use client";
import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { ButtonContainer } from "./styles";
import { colors, metrics } from "@repo/themes";

interface InformationButtonProps {
  onClick: () => void;
}

const InformationButton: React.FC<InformationButtonProps> = ({onClick}) => {
	return (
		<ButtonContainer onClick={onClick}>
			<MdInfoOutline size={metrics.iconXSmall} color={colors.primaryBlue}/>
		</ButtonContainer>
	);
};

export default InformationButton;
