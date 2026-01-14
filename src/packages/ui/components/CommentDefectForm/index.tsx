"use client";
import messages from "@repo/constants/messages";
import { colors, metrics } from "@repo/themes";
import React, { ChangeEvent } from "react";
import { MdInfoOutline } from "react-icons/md";
import { InputBox, Tooltip } from "..";
import {
  CommentContainer,
  CommentMark,
  CommentTitle,
  CommentTitleContainer,
  CommentTitleContentContainer,
} from "./styles";

interface CommentDefectFormProps {
  questionComments: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  limitMessage?: string;
}

const CommentDefectForm: React.FC<CommentDefectFormProps> = ({
  questionComments,
  onChange,
  maxLength,
  limitMessage,
}) => {
  return (
    <CommentContainer>
      <CommentTitleContentContainer>
        <CommentTitleContainer>
          <CommentTitle>{messages.Labels.comments}</CommentTitle>
          <CommentMark>*</CommentMark>
        </CommentTitleContainer>
        <Tooltip text={messages.Tooltip.commentSection} position="right">
          <MdInfoOutline size={metrics.iconBig} color={colors.primaryBlue} />
        </Tooltip>
      </CommentTitleContentContainer>
      <InputBox
        placeholder={messages.InspectionFormsScreen.defect_comment}
        initialValue={questionComments}
        onChange={onChange}
        maxLength={maxLength}
        limitMessage={limitMessage}
      />
    </CommentContainer>
  );
};

export default CommentDefectForm;
