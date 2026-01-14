import { IInspectionFormSection } from "./inspectionFormSection.model";

export interface IInspectionForm {
    id: string;
    name: string;
    short_name: string;
    description: string;
    has_comments: boolean;
    inspection_form_sections: IInspectionFormSection[];
    has_guardside_signature: boolean;
    has_foreperson_signature: boolean;
}