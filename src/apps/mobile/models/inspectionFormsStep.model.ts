import { IInspectionFormAsCategoriesDTO } from "@repo/models";

export interface IInspectionFormsStep {
    name: string;
    short_name: string;
    description: string;
    number: number;
    is_signature: boolean;
    inspection_form_id?: string;
    inspection_form?: IInspectionFormAsCategoriesDTO;
}