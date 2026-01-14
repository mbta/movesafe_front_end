import { ITag } from "./tag.model";

export type IMoveDetailsInspectionAnswer =
    IQuestionSingleDefectAnswer |
    IQuestionDoubleDefectAnswer |
    IQuestionYesNoAnswer |
    IQuestionGuardSideAndMotorPersonAnswer;

export type IQuestionSingleDefectAnswer = string[];
export type IQuestionDoubleDefectAnswer = { minorDefects: string[], majorDefects: string[] };
export type IQuestionYesNoAnswer = boolean;
export type IQuestionGuardSideAndMotorPersonAnswer = { guardSide: string[], motorPersonSide: string[] }

export interface User {
    name: string;
    badge_number: string;
}

export interface IMoveDetailsInspectionFormQuestion {
    id: string;
    description: string;
    question_type: number;
    selectedCars?: IMoveDetailsInspectionAnswer;
    comments?: string; 
    is_answered?: boolean;
}

export interface IMoveDetailsInspectionFormSection {
    name: string;
    inspection_form_questions: IMoveDetailsInspectionFormQuestion[];
}

interface IMoveDetailsInspectionForm {
    name: string;
    short_name: string;
    inspection_form_sections: IMoveDetailsInspectionFormSection[];
}

export interface IMoveDetailsInspection {
    id: string;
    inspection_form: IMoveDetailsInspectionForm;
}

interface Yard {
    name: string;
}

interface MoveReason {
    name: string;
}

interface Car {
    series_number: string;
}

export interface MoveCar {
    pair_order: number;
    first_car: Car;
    second_car: Car;
}

export interface IMoveDetailsSignature {
    uri: string;
    signature_type: string;
    user: User;
}

export interface IMoveDetailsAuditLog {
    action: string;
    created_at: string;
    user: User;
}

export interface IMoveDetails {
    due_date: string;
    status: string;
    priority_order: number;
    move_from: string;
    move_to: string;
    created_at: string;
    move_reason: MoveReason;
    yard: Yard;
    move_cars: MoveCar[];
    inspections: IMoveDetailsInspection[];
    signatures: IMoveDetailsSignature[];
    move_done_by_user: User | null;
    inspections_done_by_user: User;
    guardside_inspection_done_by_user: User | null;
    yardmaster_user: User;
    audit_logs: IMoveDetailsAuditLog[];
    tags: ITag[]
}
