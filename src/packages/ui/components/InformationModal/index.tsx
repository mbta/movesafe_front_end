"use client";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { MainTitle } from "@repo/ui/components";
import messages from "@repo/constants/messages";
import {
  Overlay,
  ModalContent,
  TextContainer,
  TitleContainer,
  CloseButtonContainer,
	ContentContainer,
	Spacer
} from "./styles";

interface InformationModalProps {
  visibility: boolean;
  onClose: () => void;
	title: string;
	content: React.ReactNode;
}

const InformationModal: React.FC<InformationModalProps> = ({
  visibility,
  onClose,
	title,
	content
}) => {
	return (
		<div>
			<Overlay show={visibility}>
				<ModalContent onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}>
					<TitleContainer>
						<TextContainer>{title}</TextContainer>
						<CloseButtonContainer>
							<MdOutlineClose size={35} onClick={onClose} />
						</CloseButtonContainer>
					</TitleContainer>
					<Spacer/>
					<ContentContainer>
						{content}
					</ContentContainer>
					</ModalContent>
			</Overlay>
		</div>
	);
};

export default InformationModal;
