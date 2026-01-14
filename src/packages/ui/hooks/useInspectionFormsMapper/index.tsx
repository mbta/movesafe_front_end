import {
  IInspection,
  IInspectionForm,
  IInspectionFormAsCategoriesDTO,
} from "@repo/models";

function useInspectionFormsMapper() {
  const returnInspectionFormsAsCategories = (
    moveInspections: IInspection[],
    inspectionForms: IInspectionForm[]
  ): IInspectionFormAsCategoriesDTO => {
    let inspectionFormsAsCategories: IInspectionFormAsCategoriesDTO = {
      categories: [],
    };

    const moveInspectionFormIds: string[] = moveInspections.map(
      (form) => form.inspection_form.id ?? ""
    );

    const moveInspectionForms: IInspectionForm[] = inspectionForms.filter(
      (form) => moveInspectionFormIds.includes(form.id)
    );

    moveInspectionForms.forEach((form) => {
      form.inspection_form_sections.forEach((section) => {
        section.inspection_form_questions.forEach((question) => {
          const inspectionId: string =
            moveInspections.find(
              (inspection) => inspection.inspection_form.id === form.id
            )?.id ?? "";

          const questionCategoryName: string =
            question.inspection_form_category.name;

          const questionCategoryIndex: number =
            inspectionFormsAsCategories.categories.findIndex(
              (category) => category.categoryName === questionCategoryName
            );

          if (questionCategoryIndex === -1) {
            inspectionFormsAsCategories.categories.push({
              categoryName: questionCategoryName,
              questions: [{ ...question, inspectionId }],
            });
          } else {
            inspectionFormsAsCategories.categories[
              questionCategoryIndex
            ].questions.push({
              ...question,
              inspectionId,
            });
          }
        });
      });
    });

    return inspectionFormsAsCategories;
  };

  return {
    returnInspectionFormsAsCategories,
  };
}

export default useInspectionFormsMapper;
