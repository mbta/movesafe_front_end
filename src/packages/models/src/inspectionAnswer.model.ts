export interface IInspectionAnswer {
    inspection_id: string;
    inspection_form_question_id: string;
    car_id?: string;
    has_minor_defect: boolean;
    has_major_defect: boolean;
    is_guardside?: boolean;
    comments?: string;
}