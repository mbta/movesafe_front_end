import { IInspectionForm, IInspectionFormQuestion, IInspectionFormSection } from "@repo/models";

export interface IInspectionAnswerDTO extends IInspectionFormQuestion {
    answer?: IAnswer;
    inspectionId?: string;
    comments?: string;
}

export type IAnswer =
    IQuestionSingleDefectAnswer |
    IQuestionDoubleDefectAnswer |
    IQuestionYesNoAnswer |
    IQuestionGuardSideAndMotorPersonAnswer

export type IQuestionSingleDefectAnswer = string[];
export type IQuestionDoubleDefectAnswer = { minorDefects: string[], majorDefects: string[] };
export type IQuestionYesNoAnswer = boolean;
export type IQuestionGuardSideAndMotorPersonAnswer = { guardSide: string[], motorPersonSide: string[] }