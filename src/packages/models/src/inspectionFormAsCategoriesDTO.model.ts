import { IInspectionAnswerDTO } from "./inspectionFormAnswerDTO.model";

export interface IInspectionFormAsCategoriesDTO {
    categories: IInspectionFormAsCategoriesDTOItem[];
}

export interface IInspectionFormAsCategoriesDTOItem {
    categoryName: string;
    questions: IInspectionAnswerDTO[];
}