"use client";
import React, { ChangeEvent } from "react";
import { 
	CommentContainer, 
	CommentMark, 
	CommentTitle, 
	CommentTitleContainer, 
	CommentTitleContentContainer 
} from "./styles";
import messages from "@repo/constants/messages";
import { InputBox, Tooltip } from "..";
import { MdInfoOutline } from "react-icons/md";
import { colors, metrics } from "@repo/themes";

interface CommentDefectFormProps {
	questionComments: string | undefined,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CommentDefectForm: React.FC<CommentDefectFormProps> = ({
	questionComments,
	onChange,
}) => {
	return (
		<CommentContainer>
			<CommentTitleContentContainer>
				<CommentTitleContainer>
					<CommentTitle>{messages.Labels.comments}</CommentTitle>
					<CommentMark>*</CommentMark>
				</CommentTitleContainer>
				<Tooltip text={messages.Tooltip.commentSection} position="right">
					<MdInfoOutline size={metrics.iconBig} color={colors.primaryBlue}/>
				</Tooltip>
			</CommentTitleContentContainer>
			<InputBox
				placeholder={messages.InspectionFormsScreen.defect_comment}
				initialValue={questionComments}
				onChange={onChange}
			/>
		</CommentContainer>
	);
};

export default CommentDefectForm;
