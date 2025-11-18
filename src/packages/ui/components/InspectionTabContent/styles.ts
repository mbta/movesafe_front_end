import styled from "styled-components";
import { colors, fonts, metrics } from '@repo/themes';

export const LabelsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding-top: 1em;
	padding-bottom: 1em;
	margin-left: -8px;
`;

export const SerialNumbersContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: right;
	gap: 1em;
`;

export const AnswersContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
`;

export const CommentText = styled.span`
	font-size: ${fonts.xSmall};
	text-align: left;
`;

export const CommentTitle = styled(CommentText)`
	margin-top: ${metrics.defaultPadding};
	color: ${colors.primaryBlue};
	font-weight: bold;
`;

export const CommentSection = styled.div`
	align-items: flex-end;
	text-align: left;
	max-width: 50%;
`;

export const LabelItem = styled.div`
	width: 5em;
	font-size: ${fonts.medium};
	color: ${colors.gray};
	text-align: center;
`;

export const SectionLabel = styled.div`
    font-size: ${fonts.medium};
    color: ${colors.gray};
	display: flex;
	text-align: flex-start;
`;

export const QuestionContainer = styled.div`
	padding-top: 1em;
	padding-bottom: 1em;
	padding-right: 0;
	display: flex;
	justify-content: space-between;
	border-top: 1px solid ${colors.softGray};
`;

export const QuestionDescriptionContainer = styled.div`
	display: flex;
	text-align: left;
	max-width: 40em;
`;

export const QuestionAnswerContainer = styled.div`
	background-color: ${colors.lightGray};
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5em;
	height: 2em;
	border-radius: 2em;
`;

export const YesNoAnswer = styled.div`
	display: flex;
	margin-right: 4em;
`;

export const DefectAnswerContainer = styled.div`
	background-color: ${colors.lightRed};
	color: ${colors.red};
	text-align: center;
	font-size: ${fonts.small};
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5.6em;
	height: 2em;
	border-radius: 2em;
`;

export const MinorDefectAnswerContainer = styled.div`
	background-color: ${colors.lightYellow};
	color: ${colors.darkYellow};
	text-align: center;
	font-size: ${fonts.small};
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5.6em;
	height: 2em;
	border-radius: 2em;
`;

export const FailedLabel = styled.div`
	margin-left: 0.3em;
`;

export const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const MotorPersonSideAnswerContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1em;
	margin-top: 0.5em;
`;

export const MotorPersonSideLabel = styled.div`
	font-size: ${fonts.xSmall};
	width: 4em;
`;