import { IInspectionFormCategory } from "./inspectionFormCategory.model";

export interface IInspectionFormQuestion {
    id: string;
    description: string;
    question_type: number;
    has_comments: number;
    inspection_form_category: IInspectionFormCategory;
}