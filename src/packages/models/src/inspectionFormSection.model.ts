import { IInspectionFormQuestion } from "./inspectionFormQuestion.model";

export interface IInspectionFormSection {
    name: string;
    inspection_form_questions: IInspectionFormQuestion[];
}