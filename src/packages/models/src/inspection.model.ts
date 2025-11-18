import { IInspectionForm } from "./inspectionForm.model";

export interface IInspection {
    id: string;
    inspection_form: Partial<IInspectionForm>;
}